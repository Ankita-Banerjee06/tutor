import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="register-page animate-fade-in section">
      <div className="container" style={{ maxWidth: '400px' }}>
        <h1 className="text-center text-gradient" style={{ marginBottom: '2rem' }}>Join IB Excellence</h1>
        <div className="glass-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="full_name" className="form-input" required value={formData.full_name} onChange={handleChange} autoComplete="name" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} autoComplete="email" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-input" required minLength="6" value={formData.password} onChange={handleChange} autoComplete="new-password" />
            </div>
            <div className="form-group">
              <label className="form-label">I am a...</label>
              <select name="role" className="form-input" value={formData.role} onChange={handleChange} style={{ appearance: 'none' }}>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>
            {error && <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Register</button>
            <p className="text-center" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--accent-blue)' }}>Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
