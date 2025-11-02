import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1>Welcome to Projects Page</h1>
    </motion.div>
  );
}
