import React from "react";
import styles from "../../../Intro.module.scss";
import gif from "../../../../../../../img/GIF/text-gif.gif";

import { motion } from "framer-motion";
import LinkArrow from "./LinkArrow";
import { Link } from "react-router-dom";

const Text = () => {
  return (
    <motion.div
      initial={{ filter: "brightness(0%)" }}
      animate={{ filter: "brightness(100%)" }}
      transition={{ duration: 1.5 }}
      className={styles["intro__text"]}
    >
      <img className={styles["intro__text__img"]} src={gif} alt="" />
      <h2 className={`${styles["intro__text__location"]} subtitle`}>
        LoremLorem
      </h2>
      <LinkArrow />
    </motion.div>
  );
};

export default Text;
