"use client";
import { motion } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
  h?: string;
}

const Button = ({ h, label, href, ...home }: ButtonProps) => {
  return (
    <motion.div
      className={`relative max-w-7xl w-full flex justify-center items-center mt-3`}
      initial={{ opacity: 0, y: 100 }} // start hidden + pushed down
      whileInView={{ opacity: 1, y: 0 }} // animate when in view
      viewport={{ once: true, amount: 0.2 }} // trigger only once when 20% is visible
      transition={{ duration: 4, ease: "easeOut" }}
    >
      <div
        className={`absolute top-1/2 w-full z-0 bg-gradient-to-l from-green-700/50 via-orange-300/60 to-green-700/50 ${
          h ? h : `h-0.5`
        }`}
      ></div>
      <a href={href ? href : ``} className="z-1">
        <button
          {...home}
          className={`z-1 px-4 py-3  rounded-full ${home.className}`}
        >
          {label}
        </button>
      </a>
    </motion.div>
  );
};

export default Button;
