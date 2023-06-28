import React from "react";

import logo from "../../img/logo.png";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img className={styles["logo"]} src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
