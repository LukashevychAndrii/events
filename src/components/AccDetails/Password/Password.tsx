import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch } from "../../../utils/redux";

import { ReactComponent as EditIcon } from "../../../img/SVG/edit.svg";
import { userUpdatePassword } from "../../../store/slices/user-slice";
import useClickOutside from "../../../hooks/useClickOutside";
import { addAlert } from "../../../store/slices/alert-slice";

const Password = () => {
  const dispatch = useAppDispatch();

  const [updatePassword, setUpdatePassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");

  const handleEditPasswordClick = () => {
    if (newPassword.trim().length < 6 || currentPassword.trim().length < 6) {
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "Min length of password is 6",
          alertType: "error",
        })
      );
    } else if (
      newPassword.trim().length > 20 ||
      currentPassword.trim().length > 20
    ) {
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "Max length of password is 20",
          alertType: "error",
        })
      );
    } else {
      dispatch(
        userUpdatePassword({
          passwordCurrent: currentPassword,
          passwordNew: newPassword,
        })
      );
      setUpdatePassword(false);
      setNewPassword("");
      setCurrentPassword("");
    }
  };
  const handleClosePasswordClick = () => {
    setUpdatePassword(false);
    setNewPassword("");
    setCurrentPassword("");
  };

  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLInputElement>(null);

  const outside1 = useClickOutside({ ref: ref1 });
  const outside2 = useClickOutside({ ref: ref2 });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (outside1 && outside2) {
        setUpdatePassword(false);
        setCurrentPassword("");
        setNewPassword("");
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [outside1, outside2]);

  return (
    <>
      <div ref={ref1} className={styles["acc-details__element"]}>
        <div>Password:</div>
        {updatePassword ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditPasswordClick();
            }}
            className={styles["acc-details__edit__form"]}
          >
            <input
              className={styles["acc-details__edit__input"]}
              name="editName"
              id="editName"
              type="text"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              autoFocus
              placeholder="Enter current password..."
            />
            <label
              className={styles["acc-details__edit__label"]}
              htmlFor="editName"
            ></label>
          </form>
        ) : (
          <div className={styles["acc-details__name"]}>**********</div>
        )}
        {updatePassword ? (
          <span
            onClick={() => {
              setUpdatePassword(false);
              setCurrentPassword("");
              setNewPassword("");
              handleEditPasswordClick();
            }}
            className={styles["acc-details__edit-icon"]}
          >
            &#10003;
          </span>
        ) : (
          <div className={styles["acc-details__edit-icon__blank"]}></div>
        )}
        {updatePassword ? (
          <span
            className={styles["acc-details__edit-icon"]}
            onClick={handleClosePasswordClick}
          >
            &#10005;
          </span>
        ) : (
          <EditIcon
            className={styles["acc-details__edit-icon"]}
            onClick={() => setUpdatePassword(true)}
          />
        )}
      </div>
      {updatePassword && (
        <div ref={ref2} className={styles["acc-details__element"]}>
          <div></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditPasswordClick();
            }}
            className={styles["acc-details__edit__form"]}
          >
            <input
              className={styles["acc-details__edit__input"]}
              name="editName"
              id="editName"
              type="text"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="Enter new password..."
            />
            <label
              className={styles["acc-details__edit__label"]}
              htmlFor="editName"
            ></label>
          </form>
          <div className={styles["acc-details__edit-icon__blank"]}></div>

          <div className={styles["acc-details__edit-icon__blank"]}></div>
        </div>
      )}
    </>
  );
};

export default Password;
