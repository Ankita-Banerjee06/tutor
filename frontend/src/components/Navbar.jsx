import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    return '/student';
  };

  return (
    <header className="navbar-glass">
      <div className="container nav-container">
        <Link to="/" className="brand">
          IB Excellence
        </Link>
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>Courses</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          {user ? (
            <>
              <Link to={getDashboardPath()} className={`nav-link`}>Dashboard</Link>
              <button onClick={logout} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`nav-link ${isActive('/login')}`}>Login</Link>
              <Link to="/contact" className={`btn-primary`}>Get Started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
