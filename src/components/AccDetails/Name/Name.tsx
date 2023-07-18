import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import { userUpdateName } from "../../../store/slices/user-slice";

import { ReactComponent as EditIcon } from "../../../img/SVG/edit.svg";
import useClickOutside from "../../../hooks/useClickOutside";
import { addAlert } from "../../../store/slices/alert-slice";

const Name = () => {
  const userDATA = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateName, setUpdateName] = React.useState(false);
  const [newName, setNewName] = React.useState(userDATA.name);
  React.useEffect(() => {
    setNewName(userDATA.name);
  }, [userDATA]);

  const handleEditNameClick = () => {
    if (userDATA.name !== newName) {
      if (newName.trim().length !== 0) {
        if (newName.trim().length <= 10) {
          dispatch(userUpdateName({ name: newName }));
          setUpdateName(false);
          console.log("BORIS");
        } else {
          dispatch(
            addAlert({
              alertTitle: "Error!",
              alertText: "Max length is 10!",
              alertType: "error",
            })
          );
        }
      } else {
        dispatch(
          addAlert({
            alertTitle: "Error!",
            alertText: "Enter valid name!",
            alertType: "error",
          })
        );
      }
    } else {
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "Entered and current names are the same!",
          alertType: "error",
        })
      );
    }
  };
  const handleCloseNameClick = () => {
    setUpdateName(false);
    setNewName(userDATA.name);
  };

  const ref = React.useRef<HTMLInputElement>(null);

  const outside = useClickOutside({ ref });

  React.useEffect(() => {
    if (outside) {
      setUpdateName(false);
      setNewName(userDATA.name);
    }
  }, [outside]);

  return (
    <div ref={ref} className={styles["acc-details__element"]}>
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
          onClick={() => {
            setUpdateName(false);
            setNewName(userDATA.name);
            handleEditNameClick();
          }}
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
