import React from "react";
import styles from "../../Calendar.module.scss";
import { useAppSelector } from "../../../../../utils/redux";
import Event from "./Event";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import noEvents from "../../../../../img/GIF/no-events.gif";

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
              className={styles["calendar__scroll-bar"]}
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
