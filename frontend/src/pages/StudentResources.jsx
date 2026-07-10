import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const StudentResources = () => {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const links = [
    { path: '/student', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { path: '/student/sessions', label: 'My Sessions', icon: <Calendar size={18} /> },
    { path: '/student/resources', label: 'Study Materials', icon: <BookOpen size={18} /> },
    { path: '/student/ai-tutor', label: 'AI Tutor', icon: <Bot size={18} /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch resources (Backend automatically filters by enrolled courses)
        const resResponse = await fetch('/api/resources' + (filter ? `?course_id=${filter}` : ''), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resResponse.ok) setResources(await resResponse.json());

        // Fetch user dashboard to get enrolled courses
        if (courses.length === 0) {
          const dashResponse = await fetch('/api/student/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (dashResponse.ok) {
            const dashData = await dashResponse.json();
            setCourses(dashData.purchased_courses || []);
          }
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const getCourseName = (courseId) => {
    const c = courses.find(c => c.id === courseId);
    return c ? c.title : `Course #${courseId}`;
  };

  return (
    <DashboardLayout role="Student" links={links}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>📚 Study Materials</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Download materials for your purchased courses.</p>
        </div>
        <select 
          className="form-input" 
          style={{ width: 'auto', marginBottom: 0 }} 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All My Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading materials...</p>
      ) : resources.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '4rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No study materials available yet. Please check back later!</p>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {resources.map(res => (
            <div key={res.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-blue)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {getCourseName(res.course_id)}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  {new Date(res.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{res.title}</h3>
              <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1.5rem', fontSize: '0.9rem' }}>{res.description}</p>
              
              <a 
                href={`http://localhost:8000/api/uploads/${res.file_path}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ textAlign: 'center', display: 'block' }}
              >
                Download File
              </a>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentResources;
