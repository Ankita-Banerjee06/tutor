const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--canvas)', color: 'var(--muted)', padding: '24px 0', marginTop: 'auto', borderTop: '1px solid var(--hairline)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: '18px', margin: 0 }}>IB Excellence</h3>
          <span style={{ fontSize: '14px' }}>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          <a href="/courses" style={{ color: 'inherit' }}>Courses</a>
          <a href="/about" style={{ color: 'inherit' }}>About Us</a>
          <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
