import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourses from './pages/AdminCourses';
import AdminUsers from './pages/AdminUsers';
import AdminBookings from './pages/AdminBookings';
import AdminSettings from './pages/AdminSettings';
import Courses from './pages/Courses';
import AITutor from './pages/AITutor';
import StudentResources from './pages/StudentResources';
import StudentSessions from './pages/StudentSessions';
import AdminResources from './pages/AdminResources';
import './index.css';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/student') || location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? '' : 'main-content'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />

          {/* Protected: Student Dashboard */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/sessions" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentSessions />
            </ProtectedRoute>
          } />
          <Route path="/student/ai-tutor" element={
            <ProtectedRoute allowedRoles={['student']}>
              <AITutor />
            </ProtectedRoute>
          } />
          <Route path="/student/resources" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentResources />
            </ProtectedRoute>
          } />

          {/* Protected: Admin Dashboard */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCourses />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminBookings />
            </ProtectedRoute>
          } />
          <Route path="/admin/resources" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminResources />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
