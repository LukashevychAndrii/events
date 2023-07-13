import React from "react";
import styles from "../../../Intro.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1564522365984-c08ed1f78893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1576085898274-069be5a26c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
];

const Carousel = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const max = React.useRef(images.length - 1);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImage((prev) => {
        if (prev === max.current) return 0;
        return prev + 1;
      });
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentImage]);

  return (
    <motion.div className={styles["intro__carousel"]}>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles["intro__carousel__photo"]}
          style={{
            backgroundImage: `url(${images[currentImage]})`,
          }}
          initial={{ filter: "brightness(0%)" }}
          animate={{ filter: "brightness(100%)" }}
          exit={{ filter: "brightness(0%)" }}
          transition={{ duration: 1.5 }}
          key={currentImage}
        ></motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Carousel;
