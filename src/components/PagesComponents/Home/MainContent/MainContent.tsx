import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";

const MainContent = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      className={styles["content"]}
    >
      <h1>text</h1>
      <h2>text</h2>
    </motion.section>
  );
};

export default MainContent;
