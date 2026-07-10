import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const links = [
    { path: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} /> },
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
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>Loading admin panel...</p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = data?.stats || {};
  const recentUsers = data?.recent_users || [];

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '0.5rem' }}>Platform Overview</h1>
      <p style={{ color: 'var(--body)', marginBottom: '2rem' }}>Real-time metrics for your tutoring platform.</p>
      
      {/* Stats Grid */}
      <div className="grid animate-fade-in" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="feature-card animate-slide-up delay-100" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Total Users</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.total_users || 0}</p>
        </div>
        <div className="feature-card animate-slide-up delay-100" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Students</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.total_students || 0}</p>
        </div>
        <div className="feature-card animate-slide-up delay-100" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Pending Bookings</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>{stats.pending_bookings || 0}</p>
        </div>
        <div className="feature-card animate-slide-up delay-200" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Total Inquiries</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.total_inquiries || 0}</p>
        </div>
        <div className="feature-card animate-slide-up delay-200" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Total Courses</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{stats.total_courses || 0}</p>
        </div>
        <div className="feature-card animate-slide-up delay-200" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Total Enrollments</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.total_enrollments || 0}</p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="feature-card animate-slide-up delay-300">
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem' }}><Users size={20} className="inline mr-2" /> Recent Registrations</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--hairline)', color: 'var(--muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--hairline)', color: 'var(--muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--hairline)', color: 'var(--muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Role</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--hairline)', color: 'var(--muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '1.5rem 1rem', color: 'var(--muted)', textAlign: 'center' }}>No recent registrations</td>
                </tr>
              ) : (
                recentUsers.map((user, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--hairline)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--ink)' }}>{user.full_name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--body)' }}>{user.email}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className="badge-pill" style={{
                        background: user.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : 'var(--surface-elevated)',
                        color: user.role === 'admin' ? 'var(--error)' : 'var(--primary)',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--body)', fontSize: '0.85rem' }}>{new Date(user.created_at).toLocaleDateString()}</td>
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
