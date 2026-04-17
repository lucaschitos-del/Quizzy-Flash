import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Quiz.css';

function buildQuestions(cards) {
  return cards.map((card) => {
    const others = cards.filter((c) => c.id !== card.id);
    const wrongChoices = others.sort(() => Math.random() - 0.5).slice(0, 3).map((c) => c.definition);
    const choices = [card.definition, ...wrongChoices].sort(() => Math.random() - 0.5);
    return { card, choices, correct: card.definition };
  }).sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const { id } = useParams();
  const { getSet } = useApp();
  const navigate = useNavigate();
  const set = getSet(id);

  const [questions, setQuestions] = useState(() => set ? buildQuestions(set.cards) : []);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!set) return null;

  const question = questions[current];
  const score = results.filter(Boolean).length;

  const handleAnswer = (choice) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    setResults((prev) => [...prev, choice === question.correct]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setQuestions(buildQuestions(set.cards));
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setShowResult(false);
  };

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    let grade = 'Keep practicing!';
    if (pct >= 90) grade = 'Excellent!';
    else if (pct >= 70) grade = 'Good job!';
    else if (pct >= 50) grade = 'Not bad!';

    return (
      <div className="quiz-page">
        <div className="quiz-header">
          <button className="back-btn" onClick={() => navigate(`/set/${id}`)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Set
          </button>
        </div>
        <div className="quiz-done">
          <div className="quiz-score-circle">
            <span className="quiz-score-num">{pct}%</span>
          </div>
          <h2>{grade}</h2>
          <p>You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct.</p>

          <div className="quiz-results-list">
            {questions.map((q, i) => (
              <div key={q.card.id} className={`quiz-result-row ${results[i] ? 'correct' : 'incorrect'}`}>
                <span className="result-icon">{results[i] ? '✓' : '✗'}</span>
                <span className="result-term">{q.card.term}</span>
                <span className="result-def">{q.card.definition}</span>
              </div>
            ))}
          </div>

          <div className="quiz-done-actions">
            <button className="btn btn-primary" onClick={handleRestart}>Try Again</button>
            <button className="btn btn-outline" onClick={() => navigate(`/set/${id}`)}>Back to Set</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <button className="back-btn" onClick={() => navigate(`/set/${id}`)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h1 className="quiz-set-title">{set.title}</h1>
        <span className="quiz-progress-label">{current + 1} / {questions.length}</span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>

      <div className="quiz-body">
        <div className="quiz-question-card">
          <p className="quiz-prompt">What is the definition of:</p>
          <h2 className="quiz-term">{question.card.term}</h2>
        </div>

        <div className="quiz-choices">
          {question.choices.map((choice, i) => {
            let state = '';
            if (answered) {
              if (choice === question.correct) state = 'correct';
              else if (choice === selected) state = 'wrong';
            }
            return (
              <button
                key={i}
                className={`quiz-choice ${state}`}
                onClick={() => handleAnswer(choice)}
                disabled={answered}
              >
                <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`quiz-feedback ${selected === question.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
            <span>{selected === question.correct ? '✓ Correct!' : `✗ Correct answer: ${question.correct}`}</span>
            <button className="btn btn-sm btn-white" onClick={handleNext}>
              {current < questions.length - 1 ? 'Next →' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
