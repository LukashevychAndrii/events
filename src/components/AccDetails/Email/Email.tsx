import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";

import { ReactComponent as EditIcon } from "../../../img/SVG/edit.svg";
import { userUpdateEmail } from "../../../store/slices/user-slice";

const Email = () => {
  const userDATA = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateEmail, setUpdateEmail] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState(userDATA.email);

  const handleEditEmailClick = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(newEmail)) {
      //alert
    } else if (newEmail.trim().length > 30) {
      //alert
    } else {
      if (newEmail !== userDATA.email) {
        setUpdateEmail(false);
        dispatch(userUpdateEmail({ email: newEmail }));
      }
    }
  };

  const handleCloseEmailClick = () => {
    setUpdateEmail(false);
    setNewEmail(userDATA.email);
  };
  return (
    <div className={styles["acc-details__element"]}>
      <div>Email:</div>
      {updateEmail ? (
        <form className={styles["acc-details__edit__form"]}>
          <input
            className={styles["acc-details__edit__input"]}
            name="editName"
            id="editName"
            type="text"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
            autoFocus
          />
          <label
            className={styles["acc-details__edit__label"]}
            htmlFor="editName"
          ></label>
        </form>
      ) : (
        <div className={styles["acc-details__name"]}>{userDATA.email}</div>
      )}
      {updateEmail ? (
        <span
          onClick={handleEditEmailClick}
          className={styles["acc-details__edit-icon"]}
        >
          &#10003;
        </span>
      ) : (
        <div className={styles["acc-details__edit-icon__blank"]}></div>
      )}
      {updateEmail ? (
        <span
          className={styles["acc-details__edit-icon"]}
          onClick={handleCloseEmailClick}
        >
          &#10005;
        </span>
      ) : (
        <EditIcon
          className={styles["acc-details__edit-icon"]}
          onClick={() => setUpdateEmail(true)}
        />
      )}
    </div>
  );
};

export default Email;
