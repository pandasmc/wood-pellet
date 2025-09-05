import React from "react";
import { motion } from "framer-motion";

export default function Section({ title, text, img, reverse }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`h-[500px] md:flex md:flex-row ${reverse ? "md:flex-row-reverse bg-[#dfc4aa]" : ""} gap-10 px-10 py-16 items-center`}
    >
      <div
        className={`max-w-[1100px] mx-auto flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } gap-10 items-center`}
      >
      <div className={`${reverse ? "text-left" : "text-right"}`}>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-700">{text}</p>
      </div>
      <img src={img} alt={title} width="550px" className="rounded-2xl" />
      </div>
    </motion.section>
  );
}
