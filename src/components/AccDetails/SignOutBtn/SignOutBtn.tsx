import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch } from "../../../utils/redux";
import { userSignOut } from "../../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";

const SignOutBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutCLick = () => {
    dispatch(userSignOut({ navigate: navigate }));
  };
  return (
    <button
      className={styles["acc-details__sign-out-btn"]}
      onClick={handleSignOutCLick}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
