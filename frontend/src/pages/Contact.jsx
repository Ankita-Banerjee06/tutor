import { useState } from 'react';

const SUBJECT_OPTIONS = [
  "Mathematics AA/AI HL/SL", "Physics", "Chemistry", 
  "Biology", "Economics", "Business Management", 
  "Computer Science", "English", "TOK", "EE", "IA"
];

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: 'Student',
    ib_programme: 'IBDP Year 1',
    subjects: [],
    service_required: '1-to-1 Tutoring',
    preferred_mode: 'Online',
    preferred_time: 'Weekdays',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => {
      const isSelected = prev.subjects.includes(subject);
      const updatedSubjects = isSelected 
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.subjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({
          full_name: '', email: '', phone: '', role: 'Student',
          ib_programme: 'IBDP Year 1', subjects: [], service_required: '1-to-1 Tutoring',
          preferred_mode: 'Online', preferred_time: 'Weekdays', message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page animate-fade-in section">
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="text-gradient">Book a Free Consultation</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '650px', margin: '1rem auto' }}>
            Need help achieving a 6 or 7 in IB? Fill out the form below, and we'll contact you within 24 hours with a personalized learning plan.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className="glass-panel info-panel">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Contact Information</h3>
            
            <div className="info-item">
              <strong>Email</strong>
              <p>admin@tutoring.com</p>
            </div>
            <div className="info-item">
              <strong>WhatsApp</strong>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <strong>Working Hours</strong>
              <p>9:00 AM - 8:00 PM (EST)</p>
            </div>
            <div className="info-item">
              <strong>Availability</strong>
              <p>Online Worldwide</p>
            </div>
            
            <div className="badge animate-pulse" style={{ marginTop: '2rem' }}>
              🎯 Free 30-Minute Consultation
            </div>
          </div>

          {/* Form */}
          <div className="glass-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="full_name" className="form-input" required value={formData.full_name} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Email Address *</label>
                  <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Phone/WhatsApp *</label>
                  <input type="tel" name="phone" className="form-input" required value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">I am a *</label>
                  <select name="role" className="form-input" value={formData.role} onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">IB Programme *</label>
                  <select name="ib_programme" className="form-input" value={formData.ib_programme} onChange={handleChange}>
                    <option value="MYP">MYP</option>
                    <option value="IBDP Year 1">IBDP Year 1</option>
                    <option value="IBDP Year 2">IBDP Year 2</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Service Required *</label>
                  <select name="service_required" className="form-input" value={formData.service_required} onChange={handleChange}>
                    <option value="1-to-1 Tutoring">1-to-1 Tutoring</option>
                    <option value="Group Classes">Group Classes</option>
                    <option value="Exam Preparation">Exam Preparation</option>
                    <option value="IA Guidance">IA Guidance</option>
                    <option value="EE Guidance">EE Guidance</option>
                    <option value="TOK Guidance">TOK Guidance</option>
                    <option value="University Counseling">University Counseling</option>
                    <option value="Mentorship">Mentorship</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Preferred Mode *</label>
                  <select name="preferred_mode" className="form-input" value={formData.preferred_mode} onChange={handleChange}>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Either">Either</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Preferred Time *</label>
                  <select name="preferred_time" className="form-input" value={formData.preferred_time} onChange={handleChange}>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject(s) Needed *</label>
                <div className="subjects-grid">
                  {SUBJECT_OPTIONS.map(sub => (
                    <label key={sub} className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.subjects.includes(sub)}
                        onChange={() => handleSubjectToggle(sub)}
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Academic Goals *</label>
                <textarea name="message" className="form-input" required value={formData.message} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : (
                  <>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}><path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg>
                    Book a Free Consultation
                  </>
                )}
              </button>
              
              {status === 'success' && (
                <div className="notification success animate-fade-in">
                  Thank you! Your request has been received. We will contact you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="notification error animate-fade-in">
                  Failed to submit. Please check your connection and try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
