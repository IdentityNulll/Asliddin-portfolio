import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const socials = [
    { icon: <Facebook />, link: "https://facebook.com" },
    { icon: <Instagram />, link: "https://instagram.com" },
    { icon: <Linkedin />, link: "https://linkedin.com" },
    { icon: <Mail />, link: "mailto:asliddin@example.com" },
  ];

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <motion.h2
          className="footer-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let’s Create Something Amazing Together 🚀
        </motion.h2>

        <div className="footer-socials">
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Hoshimov Asilbek — All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}
