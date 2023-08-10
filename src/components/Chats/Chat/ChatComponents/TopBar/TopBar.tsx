import React from "react";
import styles from "../../../Chats.module.scss";
import FindChat from "./components/FindChat";
import CurrentUserDetails from "./components/CurrentUserDetails";
import BtnBurger from "./components/BtnBurger";
import AddUserIcon from "./components/AddUserIcon";
import AddUser from "./components/AddUser";

interface props {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TopBar: React.FC<props> = ({ setFilter }) => {
  const [showCurrentUserD, setShowCurrentUserD] =
    React.useState<boolean>(false);

  const [showNewContact, setShowNewContact] = React.useState(false);

  return (
    <div className={styles["app-sidebar__bar-top"]}>
      <BtnBurger setShowCurrentUserD={setShowCurrentUserD} />
      <CurrentUserDetails
        showCurrentUserD={showCurrentUserD}
        setShowCurrentUserD={setShowCurrentUserD}
      />
      <FindChat setFilter={setFilter} />
       <AddUserIcon setShowNewContact={setShowNewContact} />
  
        <AddUser
          showNewContact={showNewContact}
          setShowNewContact={setShowNewContact}
        />
      
    </div>
  );
};

export default TopBar;
