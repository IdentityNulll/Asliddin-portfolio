import { motion } from "framer-motion";
import "./Home.css";
import AsliddinArt from "../../assets/asliddin.jpg"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      className="page home"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="home-container">
        <div className="intro">
          <h1>Hoshimov Asilbek</h1>
          <h2>Creative Designer & Visual Thinker</h2>
          <p>
            “Ubay Tools” jamoasining faol a’zosi sifatida Asilbek dizayn va
            marketing yo‘nalishida yangi maqsadlarga intilmoqda. Uning har bir
            loyihasi — bu nafaqat hunar, balki kelajak uchun dadil qadamdir.
          </p>
          <Link to="/projects" className="explore-btn">Explore My Work</Link>
        </div>

        <div className="portrait">  
          <img
            src={AsliddinArt}
            alt="Hoshimov Asilbek"
            className="hero-image"
          />
        </div>
      </div>
    </motion.div>
  );
}
