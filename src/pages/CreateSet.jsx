import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './CreateSet.css';

function newCard() {
  return { id: Date.now().toString() + Math.random(), term: '', definition: '' };
}

export default function CreateSet() {
  const { id } = useParams();
  const { createSet, updateSet, getSet } = useApp();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([newCard(), newCard(), newCard()]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const set = getSet(id);
      if (set) {
        setTitle(set.title);
        setDescription(set.description || '');
        setCards(set.cards.map((c) => ({ ...c })));
      }
    }
  }, [id]);

  const updateCard = (idx, field, value) => {
    setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
  };

  const addCard = () => {
    setCards((prev) => [...prev, newCard()]);
  };

  const removeCard = (idx) => {
    if (cards.length <= 2) return;
    setCards((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    const emptyCards = cards.filter((c) => !c.term.trim() || !c.definition.trim());
    if (emptyCards.length > 0) errs.cards = 'All cards must have a term and definition';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const validCards = cards.filter((c) => c.term.trim() && c.definition.trim());
    if (isEdit) {
      updateSet(id, { title: title.trim(), description: description.trim(), cards: validCards });
      navigate(`/set/${id}`);
    } else {
      const set = createSet({ title: title.trim(), description: description.trim(), cards: validCards });
      navigate(`/set/${set.id}`);
    }
  };

  return (
    <div className="create-set">
      <div className="create-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h1>{isEdit ? 'Edit Set' : 'Create New Set'}</h1>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {isEdit ? 'Save Changes' : 'Create Set'}
        </button>
      </div>

      <div className="create-body">
        <div className="set-meta">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="e.g. Spanish Vocabulary Chapter 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Description (optional)</label>
            <input
              type="text"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {errors.cards && <div className="error-banner">{errors.cards}</div>}

        <div className="cards-list">
          {cards.map((card, idx) => (
            <div key={card.id} className="card-editor">
              <div className="card-editor-header">
                <span className="card-number">{idx + 1}</span>
                <button
                  className="remove-card-btn"
                  onClick={() => removeCard(idx)}
                  disabled={cards.length <= 2}
                  title="Remove card"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="card-fields">
                <div className="field-group">
                  <input
                    type="text"
                    placeholder="Term"
                    value={card.term}
                    onChange={(e) => updateCard(idx, 'term', e.target.value)}
                  />
                  <label>TERM</label>
                </div>
                <div className="field-divider" />
                <div className="field-group">
                  <input
                    type="text"
                    placeholder="Definition"
                    value={card.definition}
                    onChange={(e) => updateCard(idx, 'definition', e.target.value)}
                  />
                  <label>DEFINITION</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="add-card-btn" onClick={addCard}>
          + Add Card
        </button>
      </div>
    </div>
  );
}
