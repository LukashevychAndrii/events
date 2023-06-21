import React from "react";
import styles from "./Navigation.module.scss";
import ProgressBar from "./ProgressBar/ProgressBar";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={styles["nav"]}>
      <ul>
        <li>Calendar</li>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
      </ul>
      <ProgressBar />
      <ul>
        <li>Lorem</li>
        <li>Lorem</li>
      </ul>
    </nav>
  );
};

export default Navigation;
