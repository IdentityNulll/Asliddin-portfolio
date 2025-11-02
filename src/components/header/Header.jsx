import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import AsliddinArt from "../../assets/Asliddin2.png";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src={AsliddinArt}
            alt="Asliddin Logo"
            width={200}
            height={50}
            loading="lazy"
          />
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
            About
          </Link>
          <Link to="/projects" className={`nav-link ${pathname === "/projects" ? "active" : ""}`}>
            Projects
          </Link>
        </nav>

        {/* Contact Button */}
        <Link
          to="/contact"
          className={`nav-link contact-btn ${pathname === "/contact" ? "active" : ""}`}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
