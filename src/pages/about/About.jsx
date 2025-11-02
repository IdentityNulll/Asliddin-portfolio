import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="about-page">
        <section className="section">
          <div className="section-content">
            <h1>Who I Am</h1>
            <p>
              I’m a passionate web developer focused on building modern,
              elegant, and efficient solutions with React, Node.js, and more.
            </p>
          </div>
          <div className="section-image">
            <img src="/your-photo.jpg" alt="Me" />
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h1>My Journey</h1>
            <p>
              I started coding to bring my ideas to life. Over time, I’ve
              mastered frontend and backend, blending creativity with logic.
            </p>
          </div>
          <div className="section-image">
            <img src="/journey.jpg" alt="Journey" />
          </div>
        </section>
      </div>
    </motion.div>
  );
}
