import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './StudySet.css';

export default function StudySet() {
  const { id } = useParams();
  const { getSet } = useApp();
  const navigate = useNavigate();
  const set = getSet(id);

  if (!set) {
    return (
      <div className="not-found">
        <h2>Set not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="study-set">
      <div className="study-set-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="study-set-title-area">
          <h1>{set.title}</h1>
          {set.description && <p className="set-description">{set.description}</p>}
          <span className="term-count">{set.cards.length} terms</span>
        </div>
        <button className="btn btn-outline" onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </button>
      </div>

      <div className="study-modes">
        <h2>Study Modes</h2>
        <div className="modes-grid">
          <div className="mode-card" onClick={() => navigate(`/flashcards/${id}`)}>
            <div className="mode-icon mode-icon-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div className="mode-info">
              <h3>Flashcards</h3>
              <p>Flip through cards to study terms and definitions</p>
            </div>
            <svg className="mode-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="mode-card" onClick={() => navigate(`/quiz/${id}`)}>
            <div className="mode-icon mode-icon-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className="mode-info">
              <h3>Quiz</h3>
              <p>Test your knowledge with multiple choice questions</p>
            </div>
            <svg className="mode-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="mode-card" onClick={() => navigate(`/match/${id}`)}>
            <div className="mode-icon mode-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
            </div>
            <div className="mode-info">
              <h3>Match</h3>
              <p>Match terms to definitions against the clock</p>
            </div>
            <svg className="mode-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="terms-preview">
        <h2>Terms in this set ({set.cards.length})</h2>
        <div className="terms-list">
          {set.cards.map((card) => (
            <div key={card.id} className="term-row">
              <span className="term-text">{card.term}</span>
              <div className="term-divider" />
              <span className="definition-text">{card.definition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
