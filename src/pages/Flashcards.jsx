import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Flashcards.css';

export default function Flashcards() {
  const { id } = useParams();
  const { getSet } = useApp();
  const navigate = useNavigate();
  const set = getSet(id);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(null);
  const [known, setKnown] = useState(new Set());
  const [showDone, setShowDone] = useState(false);

  if (!set) return null;

  const activeCards = cards || set.cards;
  const current = activeCards[index];
  const progress = ((index) / activeCards.length) * 100;

  const handleShuffle = () => {
    const shuffledCards = [...set.cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setShuffled(true);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setShowDone(false);
  };

  const handleReset = () => {
    setCards(null);
    setShuffled(false);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setShowDone(false);
  };

  const goNext = () => {
    if (index < activeCards.length - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    } else {
      setShowDone(true);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  };

  const markKnown = () => {
    setKnown((prev) => new Set([...prev, current.id]));
    goNext();
  };

  const markUnknown = () => {
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(current.id);
      return next;
    });
    goNext();
  };

  if (showDone) {
    const knownCount = known.size;
    const total = activeCards.length;
    return (
      <div className="flashcards-page">
        <div className="fc-header">
          <button className="back-btn" onClick={() => navigate(`/set/${id}`)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Set
          </button>
        </div>
        <div className="done-screen">
          <div className="done-emoji">{knownCount === total ? '🎉' : '📖'}</div>
          <h2>{knownCount === total ? 'Perfect round!' : 'Round complete!'}</h2>
          <p>You knew <strong>{knownCount}</strong> out of <strong>{total}</strong> cards.</p>
          <div className="done-progress-bar">
            <div className="done-progress-fill" style={{ width: `${(knownCount / total) * 100}%` }} />
          </div>
          <div className="done-actions">
            <button className="btn btn-outline" onClick={handleReset}>Restart</button>
            <button className="btn btn-primary" onClick={handleShuffle}>Shuffle & Retry</button>
            <button className="btn btn-outline" onClick={() => navigate(`/set/${id}`)}>Back to Set</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards-page">
      <div className="fc-header">
        <button className="back-btn" onClick={() => navigate(`/set/${id}`)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h1 className="fc-title">{set.title}</h1>
        <button
          className={`btn btn-sm ${shuffled ? 'btn-primary' : 'btn-outline'}`}
          onClick={shuffled ? handleReset : handleShuffle}
        >
          {shuffled ? 'Unshuffle' : 'Shuffle'}
        </button>
      </div>

      <div className="fc-progress-bar">
        <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="fc-counter">{index + 1} / {activeCards.length}</div>

      <div className={`flashcard-wrapper ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <div className="flashcard">
          <div className="flashcard-front">
            <span className="card-side-label">Term</span>
            <p>{current.term}</p>
            <span className="flip-hint">Click to flip</span>
          </div>
          <div className="flashcard-back">
            <span className="card-side-label">Definition</span>
            <p>{current.definition}</p>
          </div>
        </div>
      </div>

      <div className="fc-actions">
        <button
          className="fc-btn fc-btn-unknown"
          onClick={markUnknown}
          title="Still learning"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="fc-nav">
          <button className="fc-nav-btn" onClick={goPrev} disabled={index === 0}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="fc-nav-btn" onClick={goNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <button
          className="fc-btn fc-btn-known"
          onClick={markKnown}
          title="Got it!"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>

      <div className="fc-known-indicator">
        <span className="known-count known">{known.size} known</span>
        <span className="known-count unknown">{activeCards.length - known.size} learning</span>
      </div>
    </div>
  );
}
