import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit2 } from "lucide-react";
import api from "../../api/axios";
import "./OneProject.css";

export default function OneProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    technologies: "",
    images: [],
  });

  const token = localStorage.getItem("token");
  const isAdmin = !!token;

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setEditForm((prev) => ({ ...prev, images: files }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("technologies", editForm.technologies);

      for (let i = 0; i < editForm.images.length; i++) {
        formData.append("images", editForm.images[i]);
      }

      const res = await api.put(`/projects/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProject(res.data);
      setShowEditModal(false);
      alert("Project updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  const getImageUrl = (filename) => `http://localhost:4765${filename}`;

  if (!project) return <p>Loading...</p>;

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

      <div className="project-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {project.name}
        </motion.h1>
        {isAdmin && (
          <Edit2
            size={24}
            className="edit-pencil"
            onClick={() => {
              setShowEditModal(true);
              setEditForm({
                name: project.name,
                description: project.description,
                technologies: project.technologies,
                images: [],
              });
            }}
          />
        )}
      </div>

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
        {project.imageUrl?.map((img, i) => (
          <motion.div
            key={i}
            className="gallery-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={getImageUrl(img)}
              alt={`${project.name} ${i + 1}`}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* --- TECH STACK --- */}
      <div className="tech-list">
        {project.technologies?.map((t, i) => (
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

      {/* --- Edit Modal --- */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Project</h3>
            <form className="edit-form" onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={editForm.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editForm.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma separated)"
                value={editForm.technologies}
                onChange={handleChange}
              />
              <input
                type="file"
                name="images"
                multiple
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
