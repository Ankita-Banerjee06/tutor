import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
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
    // In a real app, this would fetch from /api/admin/users
    // For now, we simulate fetching users
    setTimeout(() => {
      setUsers([
        { id: 1, email: 'admin@admin.com', name: 'Platform Admin', role: 'admin', joined: '2026-07-10' },
        { id: 2, email: 'student1@example.com', name: 'Alice Smith', role: 'student', joined: '2026-07-09' },
        { id: 3, email: 'student2@example.com', name: 'Bob Jones', role: 'student', joined: '2026-07-08' },
        { id: 4, email: 'tutor1@example.com', name: 'Charlie T', role: 'tutor', joined: '2026-07-05' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>👥 Manage Users</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>View and manage all registered accounts.</p>
      
      <div className="glass-card">
        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem' }}>Name</th>
                  <th style={{ padding: '1rem' }}>Email</th>
                  <th style={{ padding: '1rem' }}>Role</th>
                  <th style={{ padding: '1rem' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{u.name}</td>
                    <td style={{ padding: '1rem' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        backgroundColor: u.role === 'admin' ? 'rgba(234, 179, 8, 0.2)' : (u.role === 'tutor' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(168, 85, 247, 0.2)'),
                        color: u.role === 'admin' ? 'var(--accent-blue)' : (u.role === 'tutor' ? 'var(--accent-blue)' : 'var(--accent-purple)'),
                        textTransform: 'uppercase'
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
