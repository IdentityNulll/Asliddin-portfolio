import "./About.css";
import asliddin from "../../assets/asliddin.jpg";

export default function About() {
  return (
    <div className="about-page">
      <section className="section">
        <div className="section-image">
          <img src={asliddin} alt="Me" />
        </div>
        <div className="section-content">
          <h1>Who I Am</h1>
          <p>
            I’m a passionate designer who loves crafting clean, modern, and
            visually appealing designs that tell a story. My goal is to create
            experiences that connect with people through creativity, balance,
            and attention to detail.
          </p>
        </div>
      </section>

      <section className="section reverse">
        <div className="section-image">
          <img src={asliddin} alt="My Journey" />
        </div>
        <div className="section-content">
          <h1>My Journey</h1>
          <p>
            My journey began with a curiosity for visual storytelling. Over the
            years, I’ve explored different fields of design—from branding and
            illustration to UI/UX. Each project taught me how to blend
            aesthetics with functionality to create designs that truly stand
            out.
          </p>
        </div>
      </section>
    </div>
  );
}
