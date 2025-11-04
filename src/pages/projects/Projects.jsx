import { motion } from "framer-motion";
import project from "../../assets/projects/project.png";
import "./Projects.css";
import { Link } from "react-router-dom";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Creative Portfolio",
      description:
        "A responsive portfolio website built with React and Framer Motion.",
      image: project,
    },
    {
      id: 2,
      title: "Task Tracker App",
      description:
        "A full-stack MERN app to track and manage daily tasks efficiently.",
      image: project,
    },
    {
      id: 3,
      title: "Anime API Explorer",
      description:
        "A dynamic React app that fetches anime data using Jikan API.",
      image: project,
    },
  ];

  return (
    <div className="projects-page">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="projects-title"
      >
        My Projects
      </motion.h1>

      <div className="projects-container">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: p.id * 0.1 }}
          >
            <div className="project-img">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="project-content">
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <Link to={`/projects/${p.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="project-btn"
                >
                  View Project
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
