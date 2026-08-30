import React from "react";
import { motion } from "motion/react";
import styles from "./style.module.scss";
import { opacity } from "../../anim";

interface IndexProps {
  src: string;
  isActive: boolean;
}

const Index: React.FC<IndexProps> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={styles.imageContainer}
    >
      <img
        src={src}
        className="my-32 w-full h-auto object-cover"
        alt="Image"
      />
    </motion.div>
  );
};

export default Index;
