import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Home.css';

export default function Home() {
  const { sets, deleteSet } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = sets.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setConfirmDelete(id);
  };

  const confirmDeleteSet = () => {
    deleteSet(confirmDelete);
    setConfirmDelete(null);
  };

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Your Study Sets</h1>
        <p>Learn anything with flashcards, quizzes, and more</p>
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search your sets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>No study sets found</h2>
          <p>Create your first set to get started</p>
          <button className="btn btn-primary" onClick={() => navigate('/create')}>
            + Create Set
          </button>
        </div>
      ) : (
        <div className="sets-grid">
          {filtered.map((set) => (
            <div key={set.id} className="set-card" onClick={() => navigate(`/set/${set.id}`)}>
              <div className="set-card-header">
                <span className="set-card-count">{set.cards.length} terms</span>
                <div className="set-card-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="icon-btn"
                    title="Edit"
                    onClick={() => navigate(`/edit/${set.id}`)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="icon-btn icon-btn-danger"
                    title="Delete"
                    onClick={(e) => handleDelete(e, set.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="set-card-title">{set.title}</h3>
              <p className="set-card-desc">{set.description || 'No description'}</p>
              <div className="set-card-footer">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={(e) => { e.stopPropagation(); navigate(`/flashcards/${set.id}`); }}
                >
                  Flashcards
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(e) => { e.stopPropagation(); navigate(`/quiz/${set.id}`); }}
                >
                  Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this set?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDeleteSet}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
