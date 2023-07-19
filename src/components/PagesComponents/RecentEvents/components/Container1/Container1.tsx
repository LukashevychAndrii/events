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
  event2DATA: eventDATAI;
}

const Container1: React.FC<props> = ({
  getHoveredImage,
  event1DATA,
  event2DATA,
}) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
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
  const [isHovered2, setIsHovered2] = React.useState(false);

  const [less768, setLess768] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLess768(true);
      } else {
        setLess768(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Link
      to={`/album/${event2DATA.name}`}
      ref={ref}
      className={styles["recent__gallery__container--1"]}
    >
      <motion.div
        onHoverStart={() => {
          if (!less768) {
            getHoveredImage(event1DATA.photo);
            setIsHovered(true);
          }
        }}
        onHoverEnd={() => {
          if (!less768) {
            getHoveredImage("");
            setIsHovered(false);
          }
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
              exit="initial"
            >
              <Link
                className={styles["recent__gallery__img__text"]}
                to={`/events/album/${event1DATA.name}`}
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

      {!less768 && <span></span>}
      <motion.div
        onPointerEnter={() => {
          if (!less768) {
            setIsHovered2(true);
            getHoveredImage(event2DATA.photo);
          }
        }}
        className={styles["recent__gallery__img__wrapper"]}
      >
        <motion.div
          style={{
            y,
            backgroundImage: `url(${event2DATA.photo})`,
          }}
          className={styles["recent__gallery__img"]}
        ></motion.div>
        <AnimatePresence>
          {isHovered2 && (
            <motion.div
              variants={variantsIMG}
              initial="initial"
              animate="animated"
              exit="exit"
              onPointerLeave={() => {
                getHoveredImage("");
                setIsHovered2(false);
              }}
            >
              <Link
                to={`/events/album/${event2DATA.name}`}
                className={styles["recent__gallery__img__text"]}
              >
                <motion.h3
                  variants={variantsIMG_TEXT1}
                  initial="initial"
                  animate="visible"
                  exit="initial"
                  className="subtitle"
                >
                  {event2DATA.date}
                </motion.h3>
                <motion.h2
                  variants={variantsIMG_TEXT2}
                  initial="initial"
                  animate="visible"
                  exit="initial"
                  className="underline"
                >
                  {event2DATA.name}
                </motion.h2>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};
export default Container1;
