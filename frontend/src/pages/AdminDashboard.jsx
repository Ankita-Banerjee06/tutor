import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const links = [
    { path: '/admin', label: 'Overview', icon: '📈' },
    { path: '/admin/courses', label: 'Manage Courses', icon: <GraduationCap size={18} /> },
    { path: '/admin/users', label: 'Manage Users', icon: <Users size={18} /> },
    { path: '/admin/bookings', label: 'All Bookings', icon: <Calendar size={18} /> },
    { path: '/admin/resources', label: 'Resource Library', icon: <Folder size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error('Failed to fetch admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="Admin" links={links}>
        <div className="text-center" style={{ padding: '4rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Loading admin panel...</p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = data?.stats || {};
  const recentUsers = data?.recent_users || [];

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '0.5rem' }}>Platform Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Real-time metrics for your tutoring platform.</p>
      
      {/* Stats Grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Users</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{stats.total_users || 0}</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Students</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>{stats.total_students || 0}</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pending Bookings</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.pending_bookings || 0}</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Inquiries</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.total_inquiries || 0}</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Courses</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>{stats.total_courses || 0}</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Enrollments</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ec4899' }}>{stats.total_enrollments || 0}</p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="glass-card">
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>👥 Recent Registrations</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Role</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '1.5rem 1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No recent registrations</td>
                </tr>
              ) : (
                recentUsers.map((user, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>{user.full_name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        background: user.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : user.role === 'tutor' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: user.role === 'admin' ? 'var(--error)' : user.role === 'tutor' ? 'var(--accent-purple)' : 'var(--accent-blue)',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
