import React from "react";
import styles from "./Intro.module.scss";
import { motion, useAnimation } from "framer-motion";

import logo from "../../../../img/logo.png";
import Navigation from "../../../Navigation/Navigation";

interface props {
  setShowIntro: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<props> = ({ setShowIntro }) => {
  const controls = useAnimation();
  React.useEffect(() => {
    const sequence = async () => {
      await controls.start({ height: "100vh" });
      await controls.start({
        width: "100%",
        transition: { duration: 1.5 },
      });
    };

    sequence();
  }, [controls]);

  const [logoVisible, setLogoVisible] = React.useState(true);

  return (
    <>
      <motion.div
        className={styles["intro"]}
        initial={{ height: 0, width: ".4rem" }}
        animate={controls}
        transition={{ duration: 1.5 }}
        exit={{ opacity: 0, filter: "blur(50px)" }}
      >
        {logoVisible && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className={styles["intro__logo"]}
            src={logo}
            alt="logo"
            onAnimationComplete={() =>
              setTimeout(() => {
                setLogoVisible(false);
              }, 500)
            }
          />
        )}
        <button onClick={() => setShowIntro(false)}>close</button>
      </motion.div>
    </>
  );
};

export default Intro;
