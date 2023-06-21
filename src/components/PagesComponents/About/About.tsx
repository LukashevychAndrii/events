import React from "react";
import styles from "./About.module.scss";
import { motion } from "framer-motion";
import Navigation from "../../Navigation/Navigation";

const About = () => {
  const aboutVariants = {};
  return (
    <>
      <Navigation />
      <motion.section
      // initial={{ background: "#555" }}
      // animate={{ background: "#515" }}
      // exit={{ background: "#282" }}
      // transition={{ duration: 4 }}
      >
        ABOUT
      </motion.section>
    </>
  );
};

export default About;
