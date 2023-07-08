import React from "react";
import styles from "../../Calendar.module.scss";

import { Variants, motion, useAnimationControls } from "framer-motion";
import { eventI } from "../../../../../store/slices/calendar-slice";

const variantsTEXT: Variants = {
  visibleTEXT: {
    opacity: 1,
    x: "-50%",
    y: "-50%",
  },
  hiddenTEXT: {
    opacity: 0,
    x: "-50%",
    y: "30%",
  },
};
const variantsIMAGE: Variants = {
  initialIMG: {
    scale: 1.4,
    filter: "blur(0px)",
  },
  hoveredIMG: {
    scale: 1,
    filter: "blur(3.3px)",
  },
};

interface props {
  event: eventI;
}

const Event: React.FC<props> = ({ event }) => {
  const controlsIMG = useAnimationControls();
  const controlsTEXT = useAnimationControls();
  React.useEffect(() => {
    controlsIMG.set("initialIMG");
    controlsTEXT.set("hiddenTEXT");
  });
  const handleHoverStart = () => {
    controlsIMG.set("hoveredIMG");
    controlsTEXT.set("visibleTEXT");
  };
  const handleHoverEnd = () => {
    controlsIMG.set("initialIMG");
    controlsTEXT.set("hiddenTEXT");
  };

  return (
    <>
      <li className={styles["calendar__events__event"]}>
        <motion.figure
          initial="hiddenTEXT"
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          className={styles["calendar__events__event__img__wrapper"]}
        >
          <motion.div
            variants={variantsIMAGE}
            animate={controlsIMG}
            style={{ backgroundImage: `url(${event.photo})` }}
            className={styles["calendar__events__event__img"]}
          ></motion.div>
          <motion.figcaption
            animate={controlsTEXT}
            variants={variantsTEXT}
            className={`${styles["calendar__events__event__img__text"]} subtitle u-text-center`}
          >
            {event.name}
          </motion.figcaption>
        </motion.figure>

        <div
          className={`${styles["calendar__events__event__time"]} subtitle u-mb-esm u-mt-esm u-text-center `}
        >
          {event.time}
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque odio
          harum possimus, consequuntur minima impedit architecto iure eveniet,
          consectetur tenetur ipsum, reiciendis cumque. Earum saepe blanditiis a
          ad necessitatibus id eum ratione
        </p>
      </li>
    </>
  );
};

export default Event;
