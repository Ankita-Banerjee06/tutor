const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem 0', marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} IB Excellence. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
