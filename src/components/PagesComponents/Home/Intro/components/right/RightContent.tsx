import React from "react";
import styles from "../../Intro.module.scss";
import Text from "./components/Text";

const RightContent = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 8500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {show && (
        <div className={styles["intro__right-content"]}>
          <Text />
        </div>
      )}
    </>
  );
};

export default RightContent;
