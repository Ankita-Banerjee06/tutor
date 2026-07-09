import { Link } from 'react-router-dom';

const stats = [
  { value: '98%', label: 'Score 40+ Points' },
  { value: '500+', label: 'Students Mentored' },
  { value: '12+', label: 'IB Subjects Covered' },
  { value: '4.9★', label: 'Average Rating' },
];

const testimonials = [
  {
    name: 'Arya S.',
    score: '44/45',
    text: '"The personalized study plan transformed my preparation. I went from a predicted 34 to actually scoring 44. The IA guidance was invaluable."',
  },
  {
    name: 'Liam T.',
    score: '42/45',
    text: '"My tutor understood exactly what IB examiners look for. The mock exam sessions and detailed feedback made all the difference."',
  },
  {
    name: 'Sofia M.',
    score: '40/45',
    text: '"I was struggling with Math AA HL until I found this platform. The AI Tutor helped me practice at my own pace, and my tutor filled in the gaps."',
  },
];

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="container hero-content text-center">
          <p style={{ fontSize: '0.95rem', color: 'var(--accent-blue)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            #1 IB Diploma Tutoring Platform
          </p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Master the <span className="text-gradient">IB Diploma</span><br />with Expert Guidance
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            Personalized tutoring, mentorship, and strategic guidance to help you achieve 40+ points and get into your dream university.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Explore Programs
            </Link>
            <Link to="/contact" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <p style={{ fontSize: '2.5rem', fontWeight: '700', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section" style={{ position: 'relative' }}>
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Why Choose Us?</h2>
          <div className="grid grid-3">
            <div className="glass-card feature-card text-center" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: '3rem', color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Expert Tutors</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Learn from top scorers who have mastered the IB curriculum and know exactly what examiners are looking for.</p>
            </div>
            <div className="glass-card feature-card text-center" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: '3rem', color: 'var(--accent-purple)', marginBottom: '1.5rem' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Personalized Strategy</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Every student is unique. We tailor our approach to your strengths, weaknesses, and learning style.</p>
            </div>
            <div className="glass-card feature-card text-center" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '1.5rem' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Comprehensive Support</h3>
              <p style={{ color: 'var(--text-secondary)' }}>From IA guidance to EE reviews and final exam prep, we've got you covered every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Student Success Stories</h2>
          <p className="text-center" style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Our students consistently achieve outstanding results. Here's what they have to say.
          </p>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: '1.8' }}>{t.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                  <strong>{t.name}</strong>
                  <span className="text-gradient" style={{ fontWeight: '700' }}>{t.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)', border: '1px solid var(--accent-purple)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Ace Your <span className="text-gradient">IB Exams</span>?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Book a free consultation with our expert tutors and get a personalized study plan within 24 hours.
            </p>
            <Link to="/contact" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
              Get Your Free Study Plan →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
