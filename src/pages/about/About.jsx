import { motion } from "framer-motion";
import "./About.css";
import { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import api from "../../api/axios";

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [journeyData, setJourneyData] = useState(null);

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const token = localStorage.getItem("token");
  const isAdmin = !!token;

  const fadeIn = (direction = "up", delay = 0) => ({
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
  });

  // Fetch data
  const fetchAbout = async () => {
    try {
      const res = await api.get("/about");
      setAboutData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJourney = async () => {
    try {
      const res = await api.get("/journey");
      setJourneyData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchJourney();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (type) => {
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      if (editForm.image) formData.append("image", editForm.image);

      const endpoint = type === "about" ? `/about/${aboutData._id}` : `/journey/${journeyData._id}`;

      const res = await api.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (type === "about") setAboutData(res.data);
      else setJourneyData(res.data);

      setShowAboutModal(false);
      setShowJourneyModal(false);
      alert(`${type === "about" ? "About" : "Journey"} section updated successfully!`);
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  if (!aboutData || !journeyData) return null;

  return (
    <div className="about-page">
      {/* About Section */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="section-image" variants={fadeIn("left", 0.2)}>
          <img
            src={`http://localhost:4765/uploads/${aboutData.imageUrl}`}
            alt="About Me"
          />
          {isAdmin && (
            <Edit2
              size={24}
              className="edit-pencil"
              onClick={() => {
                setShowAboutModal(true);
                setEditForm({
                  title: aboutData.title,
                  description: aboutData.description,
                  image: null,
                });
              }}
            />
          )}
        </motion.div>

        <motion.div className="section-content" variants={fadeIn("right", 0.4)}>
          <h1>{aboutData.title || "Who I Am"}</h1>
          <p>{aboutData.description}</p>
        </motion.div>
      </motion.section>

      {/* Journey Section */}
      <motion.section
        className="section reverse"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="section-image" variants={fadeIn("right", 0.2)}>
          <img
            src={`http://localhost:4765/uploads/${journeyData.imageUrl}`}
            alt="My Journey"
          />
          {isAdmin && (
            <Edit2
              size={24}
              className="edit-pencil"
              onClick={() => {
                setShowJourneyModal(true);
                setEditForm({
                  title: journeyData.title,
                  description: journeyData.description,
                  image: null,
                });
              }}
            />
          )}
        </motion.div>

        <motion.div className="section-content" variants={fadeIn("left", 0.4)}>
          <h1>{journeyData.title || "My Journey"}</h1>
          <p>{journeyData.description}</p>
        </motion.div>
      </motion.section>

      {/* About Edit Modal */}
      {showAboutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit About Section</h3>
            <form
              className="edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate("about");
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editForm.title}
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
                <button type="button" onClick={() => setShowAboutModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Journey Edit Modal */}
      {showJourneyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Journey Section</h3>
            <form
              className="edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate("journey");
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editForm.title}
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
                <button type="button" onClick={() => setShowJourneyModal(false)}>
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
