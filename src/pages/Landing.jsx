import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const { sets } = useApp();

  return (
    <div className="landing">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Free forever · No sign-up required</div>
          <h1 className="hero-title">
            Study smarter,<br />
            <span className="hero-gradient">not harder</span>
          </h1>
          <p className="hero-subtitle">
            Create flashcard sets, quiz yourself, and master any subject with
            Quizzy Flash — the free study tool that makes learning stick.
          </p>
          <div className="hero-actions">
            <button className="btn btn-hero-primary" onClick={() => navigate('/sets')}>
              Start Studying Free
            </button>
            <button className="btn btn-hero-outline" onClick={() => navigate('/create')}>
              + Create a Set
            </button>
          </div>
          <p className="hero-note">
            {sets.length} sets ready to study · No account needed
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-back" />
          <div className="hero-card hero-card-mid" />
          <div className="hero-card hero-card-front">
            <span className="hc-label">Term</span>
            <p className="hc-term">Buenos días</p>
            <div className="hc-divider" />
            <span className="hc-label">Definition</span>
            <p className="hc-def">Good morning</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stat">
          <span className="stat-num">3</span>
          <span className="stat-label">Study Modes</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">∞</span>
          <span className="stat-label">Cards per Set</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">100%</span>
          <span className="stat-label">Free</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">0</span>
          <span className="stat-label">Sign-ups Needed</span>
        </div>
      </section>

      {/* Modes */}
      <section className="modes-section">
        <div className="section-header">
          <h2>Three ways to learn</h2>
          <p>Switch between modes to reinforce your knowledge from every angle</p>
        </div>
        <div className="modes-cards">
          <div className="mode-feature-card mode-purple">
            <div className="mfc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h3>Flashcards</h3>
            <p>Flip through cards, mark what you know, and track your progress in real time.</p>
            <ul className="mfc-features">
              <li>3D flip animation</li>
              <li>Known / Learning tracking</li>
              <li>Shuffle mode</li>
            </ul>
          </div>
          <div className="mode-feature-card mode-blue">
            <div className="mfc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h3>Quiz</h3>
            <p>Test yourself with multiple-choice questions and get an instant score.</p>
            <ul className="mfc-features">
              <li>4-option multiple choice</li>
              <li>Instant feedback</li>
              <li>Full results review</li>
            </ul>
          </div>
          <div className="mode-feature-card mode-green">
            <div className="mfc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
            </div>
            <h3>Match</h3>
            <p>Race against the clock to pair every term with its definition.</p>
            <ul className="mfc-features">
              <li>Timed challenge</li>
              <li>Up to 8 pairs at once</li>
              <li>Beat your best time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="section-header">
          <h2>Up and running in seconds</h2>
          <p>No account, no setup — just open and start learning</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Create a set</h3>
            <p>Add a title and as many term–definition pairs as you need.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Pick a mode</h3>
            <p>Choose Flashcards, Quiz, or Match depending on how you want to study.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Master it</h3>
            <p>Repeat until everything sticks. Your sets are saved automatically.</p>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="topics-section">
        <div className="section-header">
          <h2>Study anything</h2>
          <p>Quizzy Flash works for every subject and every learner</p>
        </div>
        <div className="topics-grid">
          {[
            { emoji: '🌍', label: 'Languages' },
            { emoji: '🔬', label: 'Science' },
            { emoji: '📐', label: 'Maths' },
            { emoji: '🏛️', label: 'History' },
            { emoji: '💻', label: 'Programming' },
            { emoji: '🎵', label: 'Music' },
            { emoji: '📚', label: 'Literature' },
            { emoji: '⚕️', label: 'Medicine' },
          ].map((t) => (
            <div key={t.label} className="topic-chip">
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Ready to start?</h2>
          <p>Jump straight in — no sign-up, no credit card, no catch.</p>
          <div className="cta-actions">
            <button className="btn btn-hero-primary" onClick={() => navigate('/sets')}>
              Browse Study Sets
            </button>
            <button className="btn btn-hero-outline" onClick={() => navigate('/create')}>
              + Create Your First Set
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <span className="logo-icon">Q</span>
          <span className="logo-text">Quizzy Flash</span>
        </div>
        <p className="footer-copy">© 2026 Quizzy Flash. Free to use, forever.</p>
      </footer>

    </div>
  );
}
