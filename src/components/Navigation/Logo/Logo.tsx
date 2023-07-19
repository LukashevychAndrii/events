import React from "react";

import logo from "../../../img/logo.png";
import styles from "./Logo.module.scss";
import { Link, useLocation } from "react-router-dom";

interface props {
  white?: boolean;
}

const Logo: React.FC<props> = ({ white }) => {
  const prevRoute = useLocation();
  return (
    <Link to="/events/" state={{ prevRoute: prevRoute.pathname }}>
      <img
        className={`${styles["logo"]} ${white && styles["logo__white"]}`}
        src={logo}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
