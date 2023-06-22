import React from "react";
import styles from "./Heading.module.scss";
import { motion } from "framer-motion";

const Heading = () => {
  return (
    <div className={styles["heading"]}>
      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 2 }}
        className="heading-1"
      >
        Funniest &
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 2 }}
        className="heading-2"
      >
        Greatest
      </motion.h2>
    </div>
  );
};

export default Heading;
