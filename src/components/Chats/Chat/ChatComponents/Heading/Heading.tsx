import React from "react";
import styles from "../../Chat.module.scss";
import KebabMenu from "../KebabMenu/KebabMenu";
import { useAppSelector } from "../../../../../utils/redux";
import { Link } from "react-router-dom";

interface props {
  setShowGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const Heading: React.FC<props> = ({ setShowGroupInfo }) => {
  const chatDATA = useAppSelector((state) => state.chat.currentChat);

  const [small, setSmall] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) setSmall(true);
      else setSmall(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (window.innerWidth <= 750) setSmall(true);
  }, []);

  return (
    <div className={styles["chat__heading"]}>
      <div className={styles["chat__heading--left__wrapper"]}>
        {small && (
          <Link
            to={`/events/chats`}
            className={styles["chat__heading--left__link"]}
          >
            &larr;
          </Link>
        )}
        <div className={styles["chat__heading--left"]}>
          <h3 className="subtitle">{chatDATA?.name}</h3>
          {chatDATA?.date && <div className="subtitle">{chatDATA?.date}</div>}
        </div>
      </div>
      <div className={styles["chat__heading--right"]}>
        <KebabMenu setShowGroupInfo={setShowGroupInfo} />
      </div>
    </div>
  );
};

export default Heading;
