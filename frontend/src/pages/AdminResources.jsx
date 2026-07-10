import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_id: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const links = [
    { path: '/admin', label: 'Overview', icon: '📈' },
    { path: '/admin/courses', label: 'Manage Courses', icon: <GraduationCap size={18} /> },
    { path: '/admin/users', label: 'Manage Users', icon: <Users size={18} /> },
    { path: '/admin/bookings', label: 'All Bookings', icon: <Calendar size={18} /> },
    { path: '/admin/resources', label: 'Resource Library', icon: <Folder size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Fetch resources
      const resResponse = await fetch('/api/resources', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resResponse.ok) setResources(await resResponse.json());

      // Fetch courses for dropdown
      const courseResponse = await fetch('/api/courses');
      if (courseResponse.ok) {
        const courseData = await courseResponse.json();
        setCourses(courseData);
        if (courseData.length > 0) {
          setFormData(prev => ({ ...prev, course_id: courseData[0].id.toString() }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    if (!formData.course_id) {
      setMessage('Please select a course.');
      return;
    }
    
    setUploading(true);
    setMessage('');
    
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('course_id', formData.course_id);
    uploadData.append('file', file);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });
      
      if (response.ok) {
        setMessage('Resource uploaded successfully!');
        setFormData({ title: '', description: '', course_id: courses.length > 0 ? courses[0].id.toString() : '' });
        setFile(null);
        e.target.reset();
        fetchData(); // refresh list
      } else {
        const errorData = await response.json();
        setMessage(`Upload failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage('Network error. Failed to upload.');
    } finally {
      setUploading(false);
    }
  };

  const getCourseName = (courseId) => {
    const c = courses.find(c => c.id === courseId);
    return c ? c.title : `Course #${courseId}`;
  };

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>📁 Manage Resources</h1>
      
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {/* Upload Form */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Upload New Material</h3>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Course</label>
              <select className="form-input" required value={formData.course_id} onChange={(e) => setFormData({...formData, course_id: e.target.value})}>
                {courses.length === 0 && <option value="">No courses available</option>}
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <textarea className="form-input" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            
            <div className="form-group">
              <label className="form-label">File</label>
              <input type="file" className="form-input" required onChange={(e) => setFile(e.target.files[0])} />
            </div>
            
            {message && <p style={{ color: message.includes('success') ? 'var(--success)' : 'var(--error)', marginBottom: '1rem' }}>{message}</p>}
            
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </form>
        </div>

        {/* Existing Resources */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Uploaded Materials</h3>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : resources.length === 0 ? (
            <p className="text-center" style={{ color: 'var(--text-secondary)' }}>No materials uploaded yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {resources.map(res => (
                <li key={res.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{res.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)' }}>{getCourseName(res.course_id)}</span>
                  </div>
                  <a href={`http://localhost:8000/api/uploads/${res.file_path}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View File</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminResources;
