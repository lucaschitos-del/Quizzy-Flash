import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Match.css';

function buildGame(cards) {
  const subset = cards.slice(0, 8);
  const terms = subset.map((c) => ({ id: `t-${c.id}`, text: c.term, pairId: c.id, type: 'term' }));
  const defs = subset.map((c) => ({ id: `d-${c.id}`, text: c.definition, pairId: c.id, type: 'def' }));
  return [...terms, ...defs].sort(() => Math.random() - 0.5);
}

export default function Match() {
  const { id } = useParams();
  const { getSet } = useApp();
  const navigate = useNavigate();
  const set = getSet(id);

  const [tiles, setTiles] = useState(() => set ? buildGame(set.cards) : []);
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(new Set());
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (started && !done) {
      timerRef.current = setInterval(() => setElapsed((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, done]);

  if (!set) return null;

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleTile = (tile) => {
    if (!started) setStarted(true);
    if (matched.has(tile.id) || wrong.has(tile.id)) return;
    if (selected?.id === tile.id) {
      setSelected(null);
      return;
    }

    if (!selected) {
      setSelected(tile);
      return;
    }

    if (selected.pairId === tile.pairId && selected.type !== tile.type) {
      const newMatched = new Set([...matched, selected.id, tile.id]);
      setMatched(newMatched);
      setSelected(null);
      if (newMatched.size === tiles.length) {
        clearInterval(timerRef.current);
        setFinalTime(elapsed);
        setDone(true);
      }
    } else {
      setWrong(new Set([selected.id, tile.id]));
      setTimeout(() => {
        setWrong(new Set());
        setSelected(null);
      }, 600);
    }
  };

  const handleRestart = () => {
    setTiles(buildGame(set.cards));
    setSelected(null);
    setMatched(new Set());
    setWrong(new Set());
    setElapsed(0);
    setStarted(false);
    setDone(false);
    setFinalTime(0);
  };

  if (done) {
    return (
      <div className="match-page">
        <div className="match-header">
          <button className="back-btn" onClick={() => navigate(`/set/${id}`)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Set
          </button>
        </div>
        <div className="match-done">
          <div className="match-done-icon">🏆</div>
          <h2>All matched!</h2>
          <div className="match-time-display">{formatTime(finalTime)}</div>
          <p>Your time</p>
          <div className="match-done-actions">
            <button className="btn btn-primary" onClick={handleRestart}>Play Again</button>
            <button className="btn btn-outline" onClick={() => navigate(`/set/${id}`)}>Back to Set</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="match-page">
      <div className="match-header">
        <button className="back-btn" onClick={() => navigate(`/set/${id}`)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h1 className="match-title">Match</h1>
        <div className="match-timer">{formatTime(elapsed)}</div>
      </div>

      <p className="match-instructions">Match each term with its definition. Click two tiles to pair them.</p>

      <div className="match-progress">
        <span>{matched.size / 2} / {tiles.length / 2} matched</span>
        <div className="match-progress-bar">
          <div className="match-progress-fill" style={{ width: `${(matched.size / tiles.length) * 100}%` }} />
        </div>
      </div>

      <div className="match-grid">
        {tiles.map((tile) => {
          const isMatched = matched.has(tile.id);
          const isWrong = wrong.has(tile.id);
          const isSelected = selected?.id === tile.id;
          return (
            <button
              key={tile.id}
              className={`match-tile ${isMatched ? 'tile-matched' : ''} ${isWrong ? 'tile-wrong' : ''} ${isSelected ? 'tile-selected' : ''}`}
              onClick={() => handleTile(tile)}
              disabled={isMatched}
            >
              <span className="tile-type">{tile.type === 'term' ? 'Term' : 'Def'}</span>
              <span>{tile.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
