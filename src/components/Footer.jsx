import "../App.css";
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-title">Lost & Found</p>

        <p className="footer-text">
          Helping people reconnect with what matters.
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} Lost & Found. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
