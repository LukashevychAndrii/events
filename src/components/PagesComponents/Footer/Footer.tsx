import React from "react";
import styles from "./Footer.module.scss";

import { ReactComponent as InstagramIcon } from "../../../img/SVG/instagram.svg";
import { ReactComponent as PinterestIcon } from "../../../img/SVG/pinterest.svg";
import { motion } from "framer-motion";
import RenderAnimatedTextH from "../../../utils/RenderAnimatedTextH";

const Footer = () => {
  const [hover1, setHover1] = React.useState(false);

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__top"]}>
        <div style={{ overflow: "hidden" }} className="subtitle">
          <RenderAnimatedTextH text="Get in Touch" hover={hover1} />
        </div>
        <motion.div
          onHoverStart={() => setHover1(true)}
          onHoverEnd={() => setHover1(false)}
          className={`${styles["footer__top__email"]}`}
        >
          loremlorem@lorem.com
        </motion.div>
        <div className={styles["footer__top__links"]}>
          <a href="#" className={styles["footer__top__links__icon__wrapper"]}>
            <InstagramIcon className={styles["footer__top__links__icon"]} />
          </a>
          <a href="#" className={styles["footer__top__links__icon__wrapper"]}>
            <PinterestIcon className={styles["footer__top__links__icon"]} />
          </a>
        </div>
      </div>
      <div className={styles["footer__bottom"]}>
        <span className="subtitle">
          <a
            className={styles["footer__original-site-link"]}
            href="https://evagher.com/en"
            target="_blank"
            rel="noreferrer"
          >
            Original Site
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
