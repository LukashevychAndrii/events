import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";
import Heading from "../../Heading/Heading";

import logo from "../../../../img/logo.png";

const MainContent = () => {
  return (
    <>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="logo"
        src={logo}
        alt="logo"
      />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className={styles["content__heading"]}
      >
        <Heading />
      </motion.section>
      <section style={{ minHeight: "100vh" }}>qwe</section>
    </>
  );
};

export default MainContent;
