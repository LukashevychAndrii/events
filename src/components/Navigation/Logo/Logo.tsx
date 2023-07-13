import React from "react";

import logo from "../../../img/logo.png";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

interface props {
  white?: boolean;
}

const Logo: React.FC<props> = ({ white }) => {
  return (
    <Link to="/">
      <img
        className={`${styles["logo"]} ${white && styles["logo__white"]}`}
        src={logo}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
