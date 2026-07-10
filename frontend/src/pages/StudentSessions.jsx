import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const StudentSessions = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const links = [
    { path: '/student', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { path: '/student/sessions', label: 'My Sessions', icon: <Calendar size={18} /> },
    { path: '/student/resources', label: 'Study Materials', icon: <BookOpen size={18} /> },
    { path: '/student/ai-tutor', label: 'AI Tutor', icon: <Bot size={18} /> },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/student/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  return (
    <DashboardLayout role="Student" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>📅 My Sessions</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>View your upcoming and past tutoring sessions.</p>
      
      <div className="glass-card">
        {loading ? (
          <p className="text-center">Loading sessions...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>You have no booked sessions yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem' }}>Subject</th>
                  <th style={{ padding: '1rem' }}>Date & Time</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Meeting Link</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>{booking.subject}</td>
                    <td style={{ padding: '1rem' }}>{new Date(booking.session_time).toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        backgroundColor: booking.status === 'confirmed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                        color: booking.status === 'confirmed' ? 'var(--success)' : 'var(--accent-blue)'
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {booking.meeting_link ? (
                        <a href={booking.meeting_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-purple)' }}>Join Meeting</a>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)' }}>TBD</span>
                      )}
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

export default StudentSessions;
