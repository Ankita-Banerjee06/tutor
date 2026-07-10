import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (!result.success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page animate-fade-in section">
      <div className="container" style={{ maxWidth: '400px' }}>
        <h1 className="text-center display-sm" style={{ marginBottom: '32px' }}>Welcome Back</h1>
        <div className="feature-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            {error && <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>Login</button>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button type="button" onClick={() => {setEmail('admin@admin.com'); setPassword('adminpassword123');}} className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
                Fill Admin
              </button>
              <button type="button" onClick={() => {setEmail('test@gmail.com'); setPassword('123456');}} className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
                Fill Student
              </button>
            </div>

            <p className="text-center" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--accent-blue)' }}>Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
