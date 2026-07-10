import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const links = [
    { path: '/student', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { path: '/student/sessions', label: 'My Sessions', icon: <Calendar size={18} /> },
    { path: '/student/resources', label: 'Study Materials', icon: <BookOpen size={18} /> },
    { path: '/student/ai-tutor', label: 'AI Tutor', icon: <Bot size={18} /> },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/student/dashboard', {
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
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>Loading your dashboard...</p>
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
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Welcome back, {data?.user?.full_name || 'Student'}! Here's what's happening.</p>
      
      <div className="grid grid-2 animate-fade-in" style={{ gap: '2rem' }}>
        {/* Widget 1: Upcoming Sessions */}
        <div className="feature-card animate-slide-up delay-100">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem' }}><Calendar size={20} className="inline mr-2" /> Upcoming Sessions</h3>
          {upcomingSessions.length === 0 ? (
            <p style={{ color: 'var(--body)' }}>No upcoming sessions booked. <a href="/contact" style={{ color: 'var(--primary)' }}>Book one now.</a></p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {upcomingSessions.map((session, i) => (
                <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{session.subject}</span>
                  <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{session.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Widget 2: Recent Materials */}
        <div className="feature-card animate-slide-up delay-100">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem' }}><BookOpen size={20} className="inline mr-2" /> Recent Materials</h3>
          {recentResources.length === 0 ? (
            <p style={{ color: 'var(--body)' }}>No materials uploaded yet. Check back soon!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recentResources.map((res, i) => (
                <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{res.title}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{res.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Widget 2.5: Purchased Courses */}
        <div className="feature-card animate-slide-up delay-200" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem' }}><GraduationCap size={20} className="inline mr-2" /> Purchased Courses</h3>
          {purchasedCourses.length === 0 ? (
            <p style={{ color: 'var(--body)' }}>You haven't purchased any courses yet. <a href="/courses" style={{ color: 'var(--primary)' }}>Browse our courses.</a></p>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {purchasedCourses.map((course, i) => (
                <div key={i} style={{ padding: '1rem', border: '1px solid var(--hairline)', borderRadius: '8px', background: 'var(--surface-elevated)' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>{course.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Purchased on: {new Date(course.purchased_at).toLocaleDateString()}
                  </p>
                  <Link to="/student/resources">
                    <button className="btn-secondary" style={{ width: '100%' }}>Go to Course</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Widget 3: AI Tutor Promo */}
        <div className="feature-card feature-card-yellow animate-slide-up delay-300" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}><Bot size={20} className="inline mr-2" /> Need help with homework?</h3>
              <p style={{ color: 'var(--on-yellow)', opacity: 0.8 }}>Ask the AI Tutor questions based strictly on your IB syllabus.</p>
            </div>
            <Link to="/student/ai-tutor">
              <button className="btn-primary" style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--on-primary)', color: 'var(--primary)' }}>Chat with AI</button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
