import React from "react";
import styles from "../../RecentEvents.module.scss";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  variantsIMG,
  variantsIMG_TEXT1,
  variantsIMG_TEXT2,
} from "../../RecentEvents";
import { eventDATAI } from "../../../../../store/slices/recentEvents-slice";

interface props {
  getHoveredImage: (img: string) => void;
  event1DATA: eventDATAI;
}

const Container2: React.FC<props> = ({ getHoveredImage, event1DATA }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const temporaryY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let y = useTransform(temporaryY, [0, 1], ["-40%", "-60%"]);
  const [isHovered, setIsHovered] = React.useState(false);

  const AnimatedLink = motion(Link);

  return (
    <div ref={ref} className={styles["recent__gallery__container--2"]}>
      <span></span>
      <div className={styles["recent__gallery__img__wrapper"]}>
        <motion.div
          onPointerEnter={() => {
            setIsHovered(true);
            getHoveredImage(event1DATA.photo);
          }}
          className={styles["recent__gallery__img__wrapper"]}
        >
          <motion.div
            style={{
              y,
              backgroundImage: `url(${event1DATA.photo})`,
            }}
            className={styles["recent__gallery__img"]}
          ></motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={variantsIMG}
                initial="initial"
                animate="animated"
                exit="exit"
                onPointerLeave={() => {
                  getHoveredImage("");
                  setIsHovered(false);
                }}
              >
                <Link
                  className={styles["recent__gallery__img__text"]}
                  to={`/album/${event1DATA.name}`}
                >
                  <motion.h3
                    variants={variantsIMG_TEXT1}
                    initial="initial"
                    animate="visible"
                    exit="initial"
                    className="subtitle"
                  >
                    {event1DATA.date}
                  </motion.h3>
                  <motion.h2
                    variants={variantsIMG_TEXT2}
                    initial="initial"
                    animate="visible"
                    exit="initial"
                    className="underline"
                  >
                    {event1DATA.name}
                  </motion.h2>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <span></span>
    </div>
  );
};
export default Container2;
