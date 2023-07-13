import React from "react";
import styles from "../../Intro.module.scss";
import Carousel from "./components/Carousel";

const LeftContent = () => {
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
        <div className={styles["intro__left-content"]}>
          <Carousel />
        </div>
      )}
    </>
  );
};

export default LeftContent;
