import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">Q</span>
        <span className="logo-text">Quizzy Flash</span>
      </Link>
      <div className="navbar-actions">
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          + Create
        </button>
      </div>
    </nav>
  );
}
