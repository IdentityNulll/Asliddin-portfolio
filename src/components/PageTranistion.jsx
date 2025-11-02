import { motion } from "framer-motion";

export default function PageTransition({ children, direction = "right" }) {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === "right" ? 100 : -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: direction === "right" ? -100 : 100,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page"
    >
      {children}
    </motion.div>
  );
}
