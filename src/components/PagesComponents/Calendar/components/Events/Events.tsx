import React from "react";
import styles from "../../Calendar.module.scss";
import { useAppSelector } from "../../../../../utils/redux";
import { Variants, motion, useAnimationControls } from "framer-motion";
import Event from "./Event";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import noEvents from "../../../../../img/GIF/no-events.gif";

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

const Events = () => {
  const events = useAppSelector((state) => state.calendar.events);

  return (
    <>
      {events.length === 0 ? (
        <div className={`${styles["calendar__events__empty"]} subtitle`}>
          No events
          <img
            className={styles["calendar__events__empty__gif"]}
            src={noEvents}
            alt="no events"
          />
        </div>
      ) : (
        <>
          {events.length > 1 ? (
            <SimpleBar
              style={{ maxHeight: "31rem", width: "40rem" }}
              autoHide={false}
            >
              <ul className={styles["calendar__events"]}>
                {events.map((el, index) => (
                  <Event key={index} event={el} />
                ))}
              </ul>
            </SimpleBar>
          ) : (
            <ul className={styles["calendar__events"]}>
              {events.map((el, index) => (
                <Event key={index} event={el} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default Events;
