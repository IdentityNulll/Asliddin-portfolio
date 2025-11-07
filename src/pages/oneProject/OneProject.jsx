import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit2, PlusCircle } from "lucide-react";
import api from "../../api/axios";
import "./OneProject.css";

export default function OneProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddImagesModal, setShowAddImagesModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    technologies: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);

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
      setEditForm((prev) => ({ ...prev, images: Array.from(files) }));
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

      editForm.images.forEach((img) => formData.append("images", img));

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

  const handleDeleteImage = async (imgPath) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      const res = await api.delete(`/projects/${id}/image`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { imagePath: imgPath },
      });
      setProject(res.data.project);
      alert("Image deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete image!");
    }
  };

  const handleAddImages = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      newImages.forEach((img) => formData.append("images", img));

      const res = await api.put(`/projects/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProject(res.data);
      setShowAddImagesModal(false);
      setNewImages([]);
      alert("Images added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add images!");
    }
  };

  const getImageUrl = (filename) =>
    `https://asliddin.identitynull.uz${filename}`;

  if (!project) return <p>Loading...</p>;

  return (
    <motion.div
      className="one-project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button (top-left corner) */}
      <Link to="/projects" className="back-btn">
        <ArrowLeft size={20} /> <span>Back</span>
      </Link>

      <div className="project-header">
        <h1>{project.name}</h1>

        {isAdmin && (
          <div className="action-buttons">
            <button
              className="icon-btn edit-btn"
              onClick={() => {
                setShowEditModal(true);
                setEditForm({
                  name: project.name,
                  description: project.description,
                  technologies: project.technologies,
                  images: [],
                });
              }}
            >
              <Edit2 size={18} />
              <span>Edit</span>
            </button>

            <button
              className="icon-btn add-btn"
              onClick={() => setShowAddImagesModal(true)}
            >
              <PlusCircle size={18} />
              <span>Add Images</span>
            </button>
          </div>
        )}
      </div>

      <p className="one-project-desc">{project.description}</p>

      {/* --- Gallery --- */}
      <div className="project-gallery">
        {project.imageUrl?.map((img, i) => (
          <div className="gallery-item" key={i}>
            <img
              src={getImageUrl(img)}
              alt={`${project.name} ${i + 1}`}
              loading="lazy"
            />
            {isAdmin && (
              <button
                className="delete-img-btn"
                onClick={() => handleDeleteImage(img)}
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>

      {/* --- Tech Stack --- */}
      <div className="tech-list">
        {project.technologies?.map((tech, i) => (
          <span key={i} className="tech-item">
            {tech}
          </span>
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
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Add Images Modal --- */}
      {showAddImagesModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add More Images</h3>
            <form onSubmit={handleAddImages}>
              <input
                type="file"
                multiple
                onChange={(e) => setNewImages(Array.from(e.target.files))}
              />

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Upload
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddImagesModal(false);
                    setNewImages([]);
                  }}
                >
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
