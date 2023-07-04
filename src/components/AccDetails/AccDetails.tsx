import React from "react";
import styles from "./AccDetails.module.scss";

import Name from "./Name/Name";
import Email from "./Email/Email";
import Password from "./Password/Password";
import SignOutBtn from "./SignOutBtn/SignOutBtn";
import Photo from "./Photo/Photo";
import NewPhoto from "./Photo/NewPhoto";

const AccDetails = () => {
  return (
    <div className={styles["acc-details__wrapper"]}>
      <div className={styles["acc-details"]}>
        <Name />
        <Email />
        <Password />
        <Photo />
        <SignOutBtn />
      </div>
    </div>
  );
};

export default AccDetails;
