const About = () => {
  return (
    <div className="about-page animate-fade-in section">
      <div className="container">
        <div className="feature-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="display-sm" style={{ marginBottom: '24px' }}>About IB Excellence</h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '24px' }}>
            Founded by top IB alumni, IB Excellence is dedicated to demystifying the International Baccalaureate program for students worldwide. We believe that with the right strategy, any student can achieve top marks.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>
            Our mission is to provide premium, personalized guidance that goes beyond the classroom, helping you navigate the complexities of IAs, the EE, TOK, and final exams with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
