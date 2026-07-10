const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--canvas)', color: 'var(--muted)', padding: '64px 0', marginTop: 'auto', borderTop: '1px solid var(--hairline)' }}>
      <div className="container">
        <div className="grid grid-4" style={{ marginBottom: '48px' }}>
          <div>
            <h3 style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>IB Excellence</h3>
            <p style={{ fontSize: '14px' }}>The better way to master your IB Diploma.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--ink)', marginBottom: '16px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
              <li><a href="/courses" style={{ color: 'inherit' }}>Courses</a></li>
              <li><a href="/about" style={{ color: 'inherit' }}>About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--ink)', marginBottom: '16px' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
              <li><a href="#" style={{ color: 'inherit' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          <p>&copy; {new Date().getFullYear()} IB Excellence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
