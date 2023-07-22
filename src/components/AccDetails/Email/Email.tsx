import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";

import { ReactComponent as EditIcon } from "../../../img/SVG/edit.svg";
import { userUpdateEmail } from "../../../store/slices/user-slice";
import useClickOutside from "../../../hooks/useClickOutside";
import { addAlert } from "../../../store/slices/alert-slice";

const Email = () => {
  const userDATA = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateEmail, setUpdateEmail] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState(userDATA.email);
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setNewEmail(userDATA.email);
  }, [userDATA]);

  const handleEditEmailClick = () => {
    if (password.trim().length === 0) {
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "Enter valid password!",
          alertType: "error",
        })
      );
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(newEmail)) {
        dispatch(
          addAlert({
            alertTitle: "Error!",
            alertText: "Enter valid email!",
            alertType: "error",
          })
        );
      } else if (newEmail.trim().length > 30) {
        dispatch(
          addAlert({
            alertTitle: "Error!",
            alertText: "Max length is 30!",
            alertType: "error",
          })
        );
      } else {
        if (newEmail !== userDATA.email) {
          if (password.trim().length > 0) {
            setUpdateEmail(false);
            dispatch(userUpdateEmail({ email: newEmail, password: password }));
          } else {
            dispatch(
              addAlert({
                alertTitle: "Error!",
                alertText: "Enter valid email!",
                alertType: "error",
              })
            );
          }
        } else {
          dispatch(
            addAlert({
              alertTitle: "Error!",
              alertText: "Entered and current emails are the same!",
              alertType: "error",
            })
          );
        }
      }
    }
  };

  const handleCloseEmailClick = () => {
    setUpdateEmail(false);
    setNewEmail(userDATA.email);
  };

  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLInputElement>(null);

  const outside1 = useClickOutside({ ref: ref1 });
  const outside2 = useClickOutside({ ref: ref2 });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (outside1 && outside2) {
        setUpdateEmail(false);
        setNewEmail(userDATA.email);
        setPassword("");
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [outside1, outside2]);

  return (
    <>
      <div ref={ref1} className={styles["acc-details__element"]}>
        <div>Email:</div>
        {updateEmail ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditEmailClick();
            }}
            className={styles["acc-details__edit__form"]}
          >
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
              placeholder="New email..."
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
            onClick={() => {
              handleEditEmailClick();
              setUpdateEmail(false);
              setNewEmail(userDATA.email);
            }}
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
      {updateEmail && (
        <div ref={ref2} className={styles["acc-details__element"]}>
          <div></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditEmailClick();
            }}
            className={styles["acc-details__edit__form"]}
          >
            <input
              className={styles["acc-details__edit__input"]}
              name="editName"
              id="editName"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password..."
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

export default Email;
