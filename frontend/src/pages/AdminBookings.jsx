import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
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
    // In a real app, this would fetch from /api/admin/bookings
    // For now, we simulate fetching bookings
    setTimeout(() => {
      setBookings([
        { id: 101, student: 'Alice Smith', subject: 'Math AA HL', time: '2026-07-15T10:00:00Z', status: 'confirmed' },
        { id: 102, student: 'Bob Jones', subject: 'Physics HL', time: '2026-07-16T14:30:00Z', status: 'pending' },
        { id: 103, student: 'Alice Smith', subject: 'Economics SL', time: '2026-07-18T09:00:00Z', status: 'completed' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>📅 All Bookings</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Overview of all tutoring sessions.</p>
      
      <div className="glass-card">
        {loading ? (
          <p className="text-center">Loading bookings...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem' }}>ID</th>
                  <th style={{ padding: '1rem' }}>Student</th>
                  <th style={{ padding: '1rem' }}>Subject</th>
                  <th style={{ padding: '1rem' }}>Time</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>#{b.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{b.student}</td>
                    <td style={{ padding: '1rem' }}>{b.subject}</td>
                    <td style={{ padding: '1rem' }}>{new Date(b.time).toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        backgroundColor: b.status === 'confirmed' ? 'rgba(34, 197, 94, 0.2)' : (b.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255,255,255,0.1)'),
                        color: b.status === 'confirmed' ? 'var(--success)' : (b.status === 'pending' ? 'var(--accent-blue)' : 'var(--text-secondary)')
                      }}>
                        {b.status}
                      </span>
                    </td>
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

export default AdminBookings;
