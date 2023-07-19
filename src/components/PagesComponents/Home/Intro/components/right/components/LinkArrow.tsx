import React from "react";
import styles from "../../../Intro.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ChevronDownIcon } from "../../../../../../../img/SVG/chevron-down.svg";

const LinkArrow = () => {
  return (
    <Link className={styles["intro__text__link"]} to={"/events/main"}>
      <ChevronDownIcon className={styles["intro__text__chevron-down"]} />
    </Link>
  );
};

export default LinkArrow;
