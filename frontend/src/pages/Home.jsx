import { Link } from 'react-router-dom';
import { BookOpen, Target, ShieldCheck } from 'lucide-react';

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
    <div className="home-page animate-fade-in" style={{ backgroundColor: 'var(--canvas)' }}>
      {/* Hero Section */}
      <section className="section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--canvas)' }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div className="animate-slide-up">
              <span className="badge-yellow" style={{ marginBottom: '24px' }}>
                #1 IB Diploma Tutoring Platform
              </span>
              <h1 className="display-xl" style={{ marginBottom: '24px', maxWidth: '800px' }}>
                The better way to master your IB Diploma
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--body)', maxWidth: '600px', marginBottom: '48px', lineHeight: '1.6' }}>
                Personalized tutoring, mentorship, and strategic guidance to help you achieve 40+ points and get into your dream university.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/courses" className="btn-primary hover-lift animate-pulse-yellow" style={{ padding: '14px 24px', height: '48px', fontSize: '16px' }}>
                  Explore Programs
                </Link>
                <Link to="/contact" className="btn-secondary hover-lift" style={{ padding: '14px 24px', height: '48px', fontSize: '16px' }}>
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section" style={{ padding: '48px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
                <p className="stat-display" style={{ marginBottom: '8px' }}>{stat.value}</p>
                <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: '500' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section animate-slide-up delay-200">
        <div className="container">
          <h2 className="display-lg text-center" style={{ marginBottom: '64px' }}>Why Choose Us?</h2>
          <div className="grid grid-3">
            <div className="feature-card hover-lift">
              <div style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '24px' }}>
                <BookOpen size={32} />
              </div>
              <h3 className="title-md" style={{ marginBottom: '12px' }}>Expert Tutors</h3>
              <p style={{ color: 'var(--body)', fontSize: '16px' }}>Learn from top scorers who have mastered the IB curriculum and know exactly what examiners are looking for.</p>
            </div>
            <div className="feature-card hover-lift delay-100">
              <div style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '24px' }}>
                <Target size={32} />
              </div>
              <h3 className="title-md" style={{ marginBottom: '12px' }}>Personalized Strategy</h3>
              <p style={{ color: 'var(--body)', fontSize: '16px' }}>Every student is unique. We tailor our approach to your strengths, weaknesses, and learning style.</p>
            </div>
            <div className="feature-card hover-lift delay-200">
              <div style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '24px' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 className="title-md" style={{ marginBottom: '12px' }}>Comprehensive Support</h3>
              <p style={{ color: 'var(--body)', fontSize: '16px' }}>From IA guidance to EE reviews and final exam prep, we've got you covered every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section animate-slide-up delay-300">
        <div className="container">
          <h2 className="display-lg text-center" style={{ marginBottom: '16px' }}>Student Success Stories</h2>
          <p className="text-center" style={{ color: 'var(--muted)', marginBottom: '64px', maxWidth: '600px', margin: '0 auto 64px', fontSize: '18px' }}>
            Our students consistently achieve outstanding results.
          </p>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="feature-card hover-lift" style={{ animationDelay: `${i * 100}ms` }}>
                <p style={{ color: 'var(--body)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>{t.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--hairline)', paddingTop: '16px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>{t.name}</strong>
                  <span className="badge-yellow">{t.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yellow CTA Section */}
      <section className="section animate-slide-up delay-300" style={{ paddingBottom: '96px' }}>
        <div className="container">
          <div className="cta-band-yellow">
            <h2 className="display-md" style={{ marginBottom: '16px' }}>Ready to Ace Your IB Exams?</h2>
            <p style={{ color: 'var(--on-primary)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', fontSize: '16px', opacity: 0.8 }}>
              Book a free consultation with our expert tutors and get a personalized study plan within 24 hours.
            </p>
            <Link to="/contact" className="btn-primary hover-lift animate-pulse-yellow" style={{ backgroundColor: 'var(--on-primary)', color: 'var(--primary)', padding: '14px 32px', height: '48px', fontSize: '16px' }}>
              Get Your Free Study Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
