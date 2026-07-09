const Services = () => {
  return (
    <div className="services-page animate-fade-in section">
      <div className="container">
        <h1 className="section-title text-center text-gradient" style={{marginBottom: '3rem'}}>Our Programs</h1>
        <div className="grid grid-2">
          <div className="glass-card">
            <h2>1-on-1 Mentorship</h2>
            <p className="price" style={{color: 'var(--accent-blue)', fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0'}}>$100 / hr</p>
            <p>Comprehensive subject tutoring covering all Groups (1 to 6). Deep dive into core concepts, exam techniques, and past papers.</p>
            <ul style={{marginTop: '1rem', marginLeft: '1.5rem', color: 'var(--text-secondary)'}}>
              <li>Customized lesson plans</li>
              <li>24/7 doubt clearing support</li>
              <li>Progress tracking and reports</li>
            </ul>
          </div>
          <div className="glass-card">
            <h2>IA & EE Review</h2>
            <p className="price" style={{color: 'var(--accent-purple)', fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0'}}>$150 / review</p>
            <p>Expert feedback on your Internal Assessments and Extended Essay to guarantee maximum marks.</p>
            <ul style={{marginTop: '1rem', marginLeft: '1.5rem', color: 'var(--text-secondary)'}}>
              <li>Detailed structural critique</li>
              <li>Research question refinement</li>
              <li>Citation and formatting checks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
