import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./Arrow.css";

export default function Arrows() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hasMultipleSections, setHasMultipleSections] = useState(false);
  const [scrollContainer, setScrollContainer] = useState(null);

  const pages = ["/", "/about", "/projects"];
  const currentIndex = pages.indexOf(pathname);

  const goLeft = () => {
    if (currentIndex > 0) navigate(pages[currentIndex - 1]);
  };

  const goRight = () => {
    if (currentIndex < pages.length - 1) navigate(pages[currentIndex + 1]);
  };

  const scrollDown = () => {
    if (scrollContainer)
      scrollContainer.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  const scrollUp = () => {
    if (scrollContainer)
      scrollContainer.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const container = document.querySelector(".about-page");
    setScrollContainer(container);

    if (container) {
      const sections = container.querySelectorAll(".section");
      setHasMultipleSections(sections.length > 1);
    }
  }, [pathname]);

  return (
    <div className="arrow-container">
      <button className="arrow left" onClick={goLeft}><FaArrowLeft /></button>
      <button className="arrow right" onClick={goRight}><FaArrowRight /></button>

      {hasMultipleSections && (
        <>
          <button className="arrow up" onClick={scrollUp}><FaArrowUp /></button>
          <button className="arrow down" onClick={scrollDown}><FaArrowDown /></button>
        </>
      )}
    </div>
  );
}
