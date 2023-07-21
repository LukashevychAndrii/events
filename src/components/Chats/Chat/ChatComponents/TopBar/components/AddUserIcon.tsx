import React from "react";
import styles from "../../../../Chats.module.scss";

import { ReactComponent as AddUser } from "../../../../../../img/SVG/add-user.svg";
import { useAuth } from "../../../../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { addAlert } from "../../../../../../store/slices/alert-slice";
import { useAppDispatch } from "../../../../../../utils/redux";

interface props {
  setShowNewContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserIcon: React.FC<props> = ({ setShowNewContact }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (auth.isAuth) {
      setShowNewContact(true);
    } else {
      navigate(`/events/auth/sign-in`);
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "You need to have an account to add users!",
          alertType: "error",
        })
      );
    }
  };
  return (
    <AddUser
      onClick={handleClick}
      className={styles["app-sidebar__bar-top__add-user__icon"]}
    />
  );
};

export default AddUserIcon;
