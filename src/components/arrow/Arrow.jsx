// Arrows.jsx (fixed)
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./Arrow.css";

export default function Arrows() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [hasMultipleSections, setHasMultipleSections] = useState(false);
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  const pages = ["/", "/about", "/projects"];
  const currentIndex = pages.indexOf(pathname);

  const goLeft = () => currentIndex > 0 && navigate(pages[currentIndex - 1]);
  const goRight = () => currentIndex < pages.length - 1 && navigate(pages[currentIndex + 1]);

  // calculate current section index robustly for any scroll container
  const getCurrentSectionIndex = () => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    if (!container || !sections.length) return -1;

    // current scrollTop of the container (works for document or any element)
    const containerScrollTop = container.scrollTop;
    const containerRect = container.getBoundingClientRect();
    const containerHeight = container.clientHeight || window.innerHeight;

    const center = containerScrollTop + containerHeight / 2;

    let bestIndex = -1;
    let bestDiff = Infinity;

    sections.forEach((sec, i) => {
      const secRect = sec.getBoundingClientRect();
      // top of section relative to container's scroll (account for container's bounding box)
      // secTopRelative = (secRect.top - containerRect.top) + containerScrollTop
      const secTopRelative = (secRect.top - containerRect.top) + containerScrollTop;
      const secCenter = secTopRelative + sec.offsetHeight / 2;
      const diff = Math.abs(secCenter - center);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = i;
      }
    });

    return bestIndex;
  };

  const scrollToSection = (index) => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    if (!container || !sections.length) return;

    const target = sections[index];
    if (!target) return;

    // compute top relative to container.scrollTop using bounding rects
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = (targetRect.top - containerRect.top) + container.scrollTop;

    container.scrollTo({ top, behavior: "smooth" });
  };

  const scrollDown = () => {
    const idx = getCurrentSectionIndex();
    if (idx === -1) return;
    const next = Math.min(idx + 1, sectionsRef.current.length - 1);
    if (next !== idx) scrollToSection(next);
  };

  const scrollUp = () => {
    const idx = getCurrentSectionIndex();
    if (idx === -1) return;
    const prev = Math.max(idx - 1, 0);
    if (prev !== idx) scrollToSection(prev);
  };

  // detect sections and their scroll container
  const detectSectionsAndContainer = () => {
    const nodeList = Array.from(document.querySelectorAll(".section"));
    sectionsRef.current = nodeList;

    if (!nodeList.length) {
      containerRef.current = null;
      setHasMultipleSections(false);
      return;
    }

    const first = nodeList[0];

    const findScrollableAncestor = (el) => {
      let cur = el.parentElement;
      while (cur) {
        const hasScrollableY = cur.scrollHeight > cur.clientHeight;
        const overflowY = window.getComputedStyle(cur).overflowY;
        if (hasScrollableY && (overflowY === "auto" || overflowY === "scroll")) return cur;
        cur = cur.parentElement;
      }
      // fallback to document.scrollingElement
      return document.scrollingElement || document.documentElement;
    };

    containerRef.current = findScrollableAncestor(first);
    setHasMultipleSections(nodeList.length > 1);
  };

  useEffect(() => {
    // initial detection
    detectSectionsAndContainer();

    // observe for DOM changes (route swaps, react render)
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new MutationObserver(() => {
      requestAnimationFrame(detectSectionsAndContainer);
    });
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    const t = setTimeout(detectSectionsAndContainer, 120);

    return () => {
      clearTimeout(t);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // quick re-detect after route changes
  useEffect(() => {
    const t = setTimeout(detectSectionsAndContainer, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (!hasMultipleSections) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollDown();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollUp();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMultipleSections]);

  const shouldShowVertical = hasMultipleSections;

  return (
    <div className="arrow-container">
      <button className="arrow left" onClick={goLeft} aria-label="Prev page">
        <FaArrowLeft />
      </button>

      <button className="arrow right" onClick={goRight} aria-label="Next page">
        <FaArrowRight />
      </button>

      {shouldShowVertical && (
        <>
          <button className="arrow up" onClick={scrollUp} aria-label="Scroll up">
            <FaArrowUp />
          </button>
          <button className="arrow down" onClick={scrollDown} aria-label="Scroll down">
            <FaArrowDown />
          </button>
        </>
      )}
    </div>
  );
}