import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
// import Arrows from "./components/arrow/Arrow";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import "./theme/Theme.css";
import Contact from "./pages/contact/Contact";
import Footer from "./components/footer/Footer";
import OneProject from "./pages/oneProject/OneProject";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:id" element={<OneProject/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
