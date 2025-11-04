import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react"; // icons
import "./Header.css";
import AsliddinArt from "../../assets/Asliddin2.png";

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img
            src={AsliddinArt}
            alt="Asliddin Logo"
            width={180}
            height={50}
            loading="lazy"
          />
        </Link>

        {/* Hamburger menu button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`nav-link ${pathname === "/about" ? "active" : ""}`}
          >
            About
          </Link>
          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            className={`nav-link ${pathname === "/projects" ? "active" : ""}`}
          >
            Projects
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`contact-btn ${pathname === "/contact" ? "active" : ""}`}
          >
            Contact <Phone/>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
