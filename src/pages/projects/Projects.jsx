import { motion } from "framer-motion";
import "./Projects.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Plus } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    technologies: "",
    images: [],
  });

  const token = localStorage.getItem("token");
  const isAdmin = !!token;

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm((prev) => ({ ...prev, images: files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("technologies", form.technologies);

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      const res = await api.post("/projects", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProjects((prev) => [...prev, res.data]);
      setShowModal(false);
      setForm({ name: "", description: "", technologies: "", images: [] });
      alert("Project created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("Project deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const getImageUrl = (filename) => `http://localhost:4765${filename}`;

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

      {isAdmin && (
        <button className="create-btn" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Create Project
        </button>
      )}

      <div className="projects-container">
        {projects.map((p) => (
          <motion.div
            key={p._id}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="project-img">
              {p.imageUrl && p.imageUrl[0] && (
                <img
                  src={getImageUrl(p.imageUrl[0])}
                  alt={p.name}
                  loading="lazy"
                />
              )}
            </div>
            <div className="project-content">
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <Link to={`/projects/${p._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="project-btn"
                >
                  View Project
                </motion.button>
              </Link>
              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="delete-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Project</h3>
            <form className="edit-form" onSubmit={handleCreate}>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma separated)"
                value={form.technologies}
                onChange={handleChange}
              />
              <input
                type="file"
                name="images"
                multiple
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button type="submit">Create</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
