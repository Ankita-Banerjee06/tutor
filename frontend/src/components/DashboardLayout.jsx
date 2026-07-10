import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children, role, links }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--canvas)' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '260px', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--hairline)', backgroundColor: 'var(--surface-soft)' }}>
        <div className="sidebar-header" style={{ marginBottom: '2rem', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{role} Panel</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Welcome, {user?.full_name}</p>
        </div>
        
        <nav className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 'var(--rounded-md)',
                color: location.pathname === link.path ? 'var(--on-primary)' : 'var(--muted)',
                backgroundColor: location.pathname === link.path ? 'var(--primary)' : 'transparent',
                fontWeight: location.pathname === link.path ? '600' : '500',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '0 1rem' }}>
          <button onClick={logout} className="btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
