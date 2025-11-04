import { motion } from "framer-motion";
import "./About.css";
import asliddin from "../../assets/asliddin.jpg";

export default function About() {
  const fadeIn = (direction = "up", delay = 0) => {
    return {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.7, delay },
      },
    };
  };

  return (
    <div className="about-page">
      {/* Section 1 */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="section-image"
          variants={fadeIn("left", 0.2)}
        >
          <img src={asliddin} alt="Me" />
        </motion.div>

        <motion.div
          className="section-content"
          variants={fadeIn("right", 0.4)}
        >
          <h1>Who I Am</h1>
          <p>
            I’m a passionate designer who loves crafting clean, modern, and
            visually appealing designs that tell a story. My goal is to create
            experiences that connect with people through creativity, balance,
            and attention to detail.
          </p>
        </motion.div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="section reverse"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="section-image"
          variants={fadeIn("right", 0.2)}
        >
          <img src={asliddin} alt="My Journey" />
        </motion.div>

        <motion.div
          className="section-content"
          variants={fadeIn("left", 0.4)}
        >
          <h1>My Journey</h1>
          <p>
            My journey began with a curiosity for visual storytelling. Over the
            years, I’ve explored different fields of design—from branding and
            illustration to UI/UX. Each project taught me how to blend
            aesthetics with functionality to create designs that truly stand
            out.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
