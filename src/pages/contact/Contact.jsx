import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h1>

      <motion.p
        className="contact-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        I’d love to hear from you! Feel free to reach out anytime.
      </motion.p>

      <motion.div
        className="contact-cards"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="contact-card">
          <Mail className="icon" />
          <h3>Email</h3>
          <p>asliddin@example.com</p>
        </div>

        <div className="contact-card">
          <Phone className="icon" />
          <h3>Phone</h3>
          <p>+998 90 123 45 67</p>
        </div>

        <div className="contact-card">
          <MapPin className="icon" />
          <h3>Location</h3>
          <p>Tashkent, Uzbekistan</p>
        </div>
      </motion.div>
    </div>
  );
}
