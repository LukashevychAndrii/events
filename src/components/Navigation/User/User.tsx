import React from "react";
import styles from "./User.module.scss";

import { ReactComponent as DefaultAvatar } from "../../../img/SVG/default-avatar.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../utils/redux";

const User = () => {
  const userDATA = useAppSelector((state) => state.user);
  console.log(userDATA);
  return (
    <Link
      to={userDATA.ID ? "/acc-details" : "/auth/sign-in"}
      className={styles["user"]}
    >
      <DefaultAvatar />
      <span className="subtitle">
        {userDATA.name ? userDATA.name : "Log in"}
      </span>
    </Link>
  );
};

export default User;
