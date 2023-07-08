import React from "react";
import styles from "./Calendar.module.scss";
import DatePicker from "./components/DatePicker/DatePicker";
import Events from "./components/Events/Events";

const Calendar = () => {
  return (
    <div className={styles["calendar"]}>
      <DatePicker />
      <Events />
    </div>
  );
};

export default Calendar;
