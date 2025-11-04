import { motion } from "framer-motion";
import "./Home.css";
import AsliddinArt from "../../assets/asliddin.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      {/* Left side (intro) */}
      <motion.div
        className="intro"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Hoshimov Asilbek
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Creative Designer & Visual Thinker
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          “Ubay Tools” jamoasining faol a’zosi sifatida Asilbek dizayn va
          marketing yo‘nalishida yangi maqsadlarga intilmoqda. Uning har bir
          loyihasi — bu nafaqat hunar, balki kelajak uchun dadil qadamdir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link to="/projects" className="explore-btn">
            Explore My Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Right side (image) */}
      <Link className="portrait" to={"/about"}>
        <motion.img
          src={AsliddinArt}
          alt="Hoshimov Asilbek"
          className="hero-image"
        />
      </Link>
    </div>
  );
}
