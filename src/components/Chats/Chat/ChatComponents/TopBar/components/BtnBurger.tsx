import React from "react";
import styles from "../../../../Chats.module.scss";
import { useAuth } from "../../../../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../../utils/redux";
import { addAlert } from "../../../../../../store/slices/alert-slice";

interface props {
  setShowCurrentUserD: React.Dispatch<React.SetStateAction<boolean>>;
}

const BtnBurger: React.FC<props> = ({ setShowCurrentUserD }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (auth.isAuth) {
      setShowCurrentUserD(true);
    } else {
      navigate(`/events/auth/sign-in`);
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "You need to have an account to check account details!",
          alertType: "error",
        })
      );
    }
  };

  return (
    <div
      onClick={handleClick}
      className={styles["app-sidebar__bar-top__btn-burger"]}
    >
      <span></span>
    </div>
  );
};

export default BtnBurger;
