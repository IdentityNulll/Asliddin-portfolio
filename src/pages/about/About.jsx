import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="section">
        <h1>Hoshimov Asilbek</h1>
        <p>
          Ijodkor dizayner, yangi g‘oyalar ijodkori, mas’uliyatli hamkasb, halol mehnatni qadrlovchi,
          intiluvchan yosh mutaxassis va mehribon farzand.
        </p>
      </section>

      <section className="section">
        <h1>Ubay Tools</h1>
        <p>
          U “Ubay Tools” jamoasining faol a’zosi sifatida kompaniya rivoji, marketing va dizayn sohasida
          yangi maqsadlarni ko‘zlamoqda. Har bir loyiha – nafaqat hunar, balki kelajak uchun mustahkam qadamlardir.
        </p>
      </section>

      <section className="section">
        <h1>Future Goals</h1>
        <p>
          Asilbek o‘z kasbida muntazam o‘sishni, ijodda mukammallikka intilishni va yangi yutuqlarga erishishni maqsad qilgan.
          Uning rejalarida ham yanada dadil qadamlar, yangicha loyihalar va o‘ziga xos yutuqlar bor.
        </p>
      </section>
    </motion.div>
  );
}
