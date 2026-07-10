import DashboardLayout from '../components/DashboardLayout';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';

const AdminSettings = () => {
  const links = [
    { path: '/admin', label: 'Overview', icon: '📈' },
    { path: '/admin/courses', label: 'Manage Courses', icon: <GraduationCap size={18} /> },
    { path: '/admin/users', label: 'Manage Users', icon: <Users size={18} /> },
    { path: '/admin/bookings', label: 'All Bookings', icon: <Calendar size={18} /> },
    { path: '/admin/resources', label: 'Resource Library', icon: <Folder size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <DashboardLayout role="Admin" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>⚙️ Platform Settings</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Configure global platform settings.</p>
      
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>General Configuration</h3>
          <div className="form-group">
            <label className="form-label">Platform Name</label>
            <input type="text" className="form-input" defaultValue="IB Excellence Tutor" disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Support Email</label>
            <input type="email" className="form-input" defaultValue="support@ibexcellence.com" disabled />
          </div>
          <button className="btn-primary" disabled>Save Changes</button>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Integrations</h3>
          <div className="form-group">
            <label className="form-label">Razorpay Webhook Secret</label>
            <input type="password" className="form-input" defaultValue="********" disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Groq API Key (AI Tutor)</label>
            <input type="password" className="form-input" defaultValue="********" disabled />
          </div>
          <button className="btn-secondary" disabled>Update Keys</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
