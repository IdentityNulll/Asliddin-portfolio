import { motion } from "framer-motion";
import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit2 } from "lucide-react";
import api from "../../api/axios";

export default function Home() {
  const [homeData, setHomeData] = useState(null); // start as null
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    who: "",
    image: null,
  });

  const token = localStorage.getItem("token");
  const isAdmin = !!token;

  // Fetch home data from backend
  const fetchHome = async () => {
    try {
      const res = await api.get("/home");
      setHomeData(res.data);
      setEditForm({
        title: res.data.title,
        description: res.data.description,
        who: res.data.who,
        image: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      formData.append("who", editForm.who);
      if (editForm.image) formData.append("image", editForm.image);

      const res = await api.put(`/home/${homeData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setHomeData(res.data);
      setShowEditModal(false);
      alert("Home updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  if (!homeData) return null; // don't render anything until data is loaded

  return (
    <div className="home-container">
      {/* Left side (intro) */}
      <motion.div
        className="intro"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {isAdmin && (
          <button className="edit-btn" onClick={() => setShowEditModal(true)}>
            <Edit2 size={18} /> Edit
          </button>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {homeData.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {homeData.who}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {homeData.description}
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
          src={
            homeData.image
              ? `http://localhost:4765/uploads/${homeData.image}`
              : ""
          }
          alt={homeData.title}
          className="hero-image"
        />
      </Link>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Home Info</h3>
            <form onSubmit={handleUpdate} className="edit-form">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editForm.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="who"
                placeholder="Who"
                value={editForm.who}
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editForm.description}
                onChange={handleChange}
              />
              <input type="file" name="image" onChange={handleChange} />
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
    </div>
  );
}
