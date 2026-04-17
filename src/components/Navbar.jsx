import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className={`navbar ${isLanding ? 'navbar-transparent' : ''}`}>
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">Q</span>
        <span className="logo-text">Quizzy Flash</span>
      </Link>
      {isLanding ? (
        <div className="navbar-actions">
          <Link to="/sets" className="nav-link">My Sets</Link>
          <button className="btn btn-primary" onClick={() => navigate('/create')}>
            + Create Set
          </button>
        </div>
      ) : (
        <div className="navbar-actions">
          <Link to="/sets" className="nav-link">My Sets</Link>
          <button className="btn btn-primary" onClick={() => navigate('/create')}>
            + Create
          </button>
        </div>
      )}
    </nav>
  );
}
