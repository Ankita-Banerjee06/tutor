import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const links = [
    { path: '/admin', label: 'Overview', icon: '📈' },
    { path: '/admin/courses', label: 'Manage Courses', icon: <GraduationCap size={18} /> },
    { path: '/admin/users', label: 'Manage Users', icon: <Users size={18} /> },
    { path: '/admin/bookings', label: 'All Bookings', icon: <Calendar size={18} /> },
    { path: '/admin/resources', label: 'Resource Library', icon: <Folder size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        setCourses(await response.json());
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price) || 0
        })
      });
      
      if (response.ok) {
        setMessage('Course created successfully!');
        setFormData({ title: '', description: '', price: '' });
        fetchCourses(); // refresh list
      } else {
        const errorData = await response.json();
        setMessage(`Creation failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage('Network error. Failed to create course.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>🎓 Manage Courses</h1>
      
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {/* Create Form */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Create New Course</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Price (INR)</label>
              <input type="number" step="0.01" className="form-input" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows="4" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            
            {message && <p style={{ color: message.includes('success') ? 'var(--success)' : 'var(--error)', marginBottom: '1rem' }}>{message}</p>}
            
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Course'}
            </button>
          </form>
        </div>

        {/* Existing Courses */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Existing Courses</h3>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center" style={{ color: 'var(--text-secondary)' }}>No courses created yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {courses.map(course => (
                <li key={course.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{course.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)' }}>₹{course.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminCourses;
