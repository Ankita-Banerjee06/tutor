const About = () => {
  return (
    <div className="about-page animate-fade-in section">
      <div className="container">
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '20px' }}>
          <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>About IB Excellence</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Founded by top IB alumni, IB Excellence is dedicated to demystifying the International Baccalaureate program for students worldwide. We believe that with the right strategy, any student can achieve top marks.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Our mission is to provide premium, personalized guidance that goes beyond the classroom, helping you navigate the complexities of IAs, the EE, TOK, and final exams with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
