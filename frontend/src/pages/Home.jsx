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
    <div className="home-page" style={{ backgroundColor: 'var(--canvas)' }}>
      {/* Hero Section */}
      <section className="section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--canvas)' }}>
        <div className="container text-center">
          <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            #1 IB Diploma Tutoring Platform
          </p>
          <h1 className="display-xl" style={{ marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px' }}>
            The better way to master your IB Diploma
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            Personalized tutoring, mentorship, and strategic guidance to help you achieve 40+ points and get into your dream university.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/courses" className="btn-primary" style={{ padding: '14px 24px', height: '48px', fontSize: '16px' }}>
              Explore Programs
            </Link>
            <Link to="/contact" className="btn-secondary" style={{ padding: '14px 24px', height: '48px', fontSize: '16px' }}>
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '48px 0', borderTop: '1px solid var(--hairline-soft)', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="display-sm" style={{ marginBottom: '4px' }}>{stat.value}</p>
                <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: '500' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ backgroundColor: 'var(--canvas)' }}>
        <div className="container">
          <h2 className="display-lg text-center" style={{ marginBottom: '64px' }}>Why Choose Us?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div style={{ fontSize: '32px', color: 'var(--ink)', marginBottom: '24px' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 className="title-md" style={{ marginBottom: '12px' }}>Expert Tutors</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Learn from top scorers who have mastered the IB curriculum and know exactly what examiners are looking for.</p>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: '32px', color: 'var(--ink)', marginBottom: '24px' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 className="title-md" style={{ marginBottom: '12px' }}>Personalized Strategy</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Every student is unique. We tailor our approach to your strengths, weaknesses, and learning style.</p>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: '32px', color: 'var(--ink)', marginBottom: '24px' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="title-md" style={{ marginBottom: '12px' }}>Comprehensive Support</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px' }}>From IA guidance to EE reviews and final exam prep, we've got you covered every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ backgroundColor: 'var(--canvas)' }}>
        <div className="container">
          <h2 className="display-lg text-center" style={{ marginBottom: '16px' }}>Student Success Stories</h2>
          <p className="text-center" style={{ color: 'var(--muted)', marginBottom: '64px', maxWidth: '600px', margin: '0 auto 64px', fontSize: '18px' }}>
            Our students consistently achieve outstanding results.
          </p>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>{t.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--hairline-soft)', paddingTop: '16px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>{t.name}</strong>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--ink)' }}>{t.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--canvas)', paddingBottom: '96px' }}>
        <div className="container">
          <div className="cta-band-light">
            <h2 className="display-sm" style={{ marginBottom: '16px' }}>Ready to Ace Your IB Exams?</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px', fontSize: '16px' }}>
              Book a free consultation with our expert tutors and get a personalized study plan within 24 hours.
            </p>
            <Link to="/contact" className="btn-primary" style={{ padding: '14px 32px', height: '48px', fontSize: '16px' }}>
              Get Your Free Study Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
