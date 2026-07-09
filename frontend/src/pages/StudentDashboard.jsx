import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const links = [
    { path: '/student', label: 'Overview', icon: '📊' },
    { path: '/student/sessions', label: 'My Sessions', icon: '📅' },
    { path: '/student/resources', label: 'Study Materials', icon: '📚' },
    { path: '/student/ai-tutor', label: 'AI Tutor', icon: '🤖' },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/student/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="Student" links={links}>
        <div className="text-center" style={{ padding: '4rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  const upcomingSessions = data?.upcoming_sessions || [];
  const recentResources = data?.recent_resources || [];
  const purchasedCourses = data?.purchased_courses || [];

  return (
    <DashboardLayout role="Student" links={links}>
      <h1 style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Welcome back, {data?.user?.full_name || 'Student'}! Here's what's happening.</p>
      
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {/* Widget 1: Upcoming Sessions */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>📅 Upcoming Sessions</h3>
          {upcomingSessions.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No upcoming sessions booked. <a href="/contact" style={{ color: 'var(--accent-blue)' }}>Book one now.</a></p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {upcomingSessions.map((session, i) => (
                <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{session.subject}</span>
                  <span style={{ color: 'var(--accent-blue)', fontSize: '0.85rem' }}>{session.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Widget 2: Recent Materials */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>📚 Recent Materials</h3>
          {recentResources.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No materials uploaded yet. Check back soon!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recentResources.map((res, i) => (
                <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{res.title}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{res.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Widget 2.5: Purchased Courses */}
        <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>🎓 Purchased Courses</h3>
          {purchasedCourses.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>You haven't purchased any courses yet. <a href="/courses" style={{ color: 'var(--accent-blue)' }}>Browse our courses.</a></p>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {purchasedCourses.map((course, i) => (
                <div key={i} style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>{course.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Purchased on: {new Date(course.purchased_at).toLocaleDateString()}
                  </p>
                  <button className="btn-secondary" style={{ width: '100%' }}>Go to Course</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Widget 3: AI Tutor Promo */}
        <div className="glass-card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)', border: '1px solid var(--accent-purple)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>🤖 Need help with homework?</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Ask the AI Tutor questions based strictly on your IB syllabus.</p>
            </div>
            <button className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Chat with AI</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
