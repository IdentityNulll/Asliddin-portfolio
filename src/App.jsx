import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import Arrows from "./components/arrow/Arrow";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import "./theme/Theme.css";
import Contact from "./pages/contact/Contact";

function App() {
  const location = useLocation(); // 👈 needed for AnimatePresence

  return (
    <>
      <Header />

      {/* AnimatePresence enables exit + enter animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </AnimatePresence>

      <Arrows />
    </>
  );
}

export default App;
