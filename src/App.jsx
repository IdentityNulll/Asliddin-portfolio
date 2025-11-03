import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
// import Arrows from "./components/arrow/Arrow";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import "./theme/Theme.css";
import Contact from "./pages/contact/Contact";

function App() {

  return (
    <>
      <Header />

      {/* AnimatePresence enables exit + enter animations */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact/>}/>
        </Routes>

      {/* <Arrows /> */}
    </>
  );
}

export default App;
