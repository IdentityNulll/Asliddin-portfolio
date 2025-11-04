import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import projectImg1 from "../../assets/projects/project.png";
import projectImg2 from "../../assets/projects/project2.png";
import projectImg3 from "../../assets/projects/project3.jpg";
import "./OneProject.css";

export default function OneProject() {
  const { id } = useParams();

  const projects = [
    {
      id: "1",
      title: "Creative Portfolio",
      description:
        "A modern, responsive portfolio website built with React and Framer Motion. It features smooth animations, interactive components, and a clean design.",
      images: [projectImg1, projectImg2, projectImg3],
      tech: ["React", "Framer Motion", "CSS"],
    },
    {
      id: "2",
      title: "Task Tracker App",
      description:
        "A full-stack MERN app to track and manage daily tasks efficiently. Includes CRUD operations, login system, and persistent storage.",
      images: [projectImg2, projectImg3, projectImg1],
      tech: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      id: "3",
      title: "Anime API Explorer",
      description:
        "A dynamic React app that fetches anime data using the Jikan API, allowing users to explore trending anime, characters, and more.",
      images: [projectImg3, projectImg2, projectImg1],
      tech: ["React", "REST API", "Jikan API"],
    },
  ];

  const project = projects.find((p) => p.id === id);

  if (!project)
    return (
      <div className="project-not-found">
        <h2>Project not found 😢</h2>
        <Link to="/projects" className="back-link">
          Go Back
        </Link>
      </div>
    );

  return (
    <motion.div
      className="one-project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/projects" className="back-btn">
        <ArrowLeft /> Back
      </Link>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>

      <motion.p
        className="one-project-desc"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {project.description}
      </motion.p>

      {/* --- GALLERY --- */}
      <div className="project-gallery">
        {project.images.map((img, i) => (
          <motion.div
            key={i}
            className="gallery-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={img} alt={`${project.title} ${i + 1}`} loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* --- TECH STACK --- */}
      <div className="tech-list">
        {project.tech.map((t, i) => (
          <motion.span
            key={i}
            className="tech-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
