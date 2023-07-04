import React from "react";
import styles from "./User.module.scss";

import { ReactComponent as DefaultAvatar } from "../../../img/SVG/default-avatar.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../utils/redux";

const User = () => {
  const userDATA = useAppSelector((state) => state.user);
  return (
    <Link
      to={userDATA.ID ? "/acc-details" : "/auth/sign-in"}
      className={styles["user"]}
    >
      {userDATA.photo ? (
        <img
          className={styles["user__photo"]}
          src={userDATA.photo}
          alt="user"
        />
      ) : (
        <DefaultAvatar className={styles["user__photo"]} />
      )}
      <span className="subtitle">
        {userDATA.name ? userDATA.name : "Log in"}
      </span>
    </Link>
  );
};

export default User;
