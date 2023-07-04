import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import { userUpdateName } from "../../../store/slices/user-slice";

import { ReactComponent as EditIcon } from "../../../img/SVG/edit.svg";

const Name = () => {
  const userDATA = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateName, setUpdateName] = React.useState(false);
  const [newName, setNewName] = React.useState(userDATA.name);

  const handleEditNameClick = () => {
    if (userDATA.name !== newName) {
      if (newName.trim().length !== 0) {
        if (newName.trim().length <= 10) {
          dispatch(userUpdateName({ name: newName }));
          setUpdateName(false);
        } else {
          //alert
        }
      } else {
        //alert
      }
    } else {
      //alert
    }
  };
  const handleCloseNameClick = () => {
    setUpdateName(false);
    setNewName(userDATA.name);
  };

  return (
    <div className={styles["acc-details__element"]}>
      <div>Name:</div>
      {updateName ? (
        <form className={styles["acc-details__edit__form"]}>
          <input
            className={styles["acc-details__edit__input"]}
            name="editName"
            id="editName"
            type="text"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            autoFocus
          />
          <label
            className={styles["acc-details__edit__label"]}
            htmlFor="editName"
          ></label>
        </form>
      ) : (
        <div className={styles["acc-details__name"]}>{userDATA.name}</div>
      )}
      {updateName ? (
        <span
          onClick={handleEditNameClick}
          className={styles["acc-details__edit-icon"]}
        >
          &#10003;
        </span>
      ) : (
        <div className={styles["acc-details__edit-icon__blank"]}></div>
      )}
      {updateName ? (
        <span
          className={styles["acc-details__edit-icon"]}
          onClick={handleCloseNameClick}
        >
          &#10005;
        </span>
      ) : (
        <EditIcon
          className={styles["acc-details__edit-icon"]}
          onClick={() => setUpdateName(true)}
        />
      )}
    </div>
  );
};

export default Name;
