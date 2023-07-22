import React from "react";
import styles from "./Error.module.scss";
import Navigation from "../../Navigation/Navigation";
import NavPage from "../../Navigation/NavPage/NavPage";
import { Link } from "react-router-dom";

import { Textfit } from "react-textfit";
import Footer from "../Footer/Footer";

const Error = () => {
  const [showNavPage, setShowNavPage] = React.useState(false);

  return (
    <>
      <Navigation
        showNavPage={showNavPage}
        setShowNavPage={setShowNavPage}
        white={showNavPage}
      />
      <div className={styles["error__wrapper"]}>
        <div className={styles["error"]}>
          <div className={`${styles["error__text"]} subtitle`}>
            <Textfit mode="single">Page not Found</Textfit>
          </div>
          <Link className={styles["error__link"]} to="/events/">
            Home
          </Link>
        </div>
      </div>
      <NavPage showNavPage={showNavPage} setShowNavPage={setShowNavPage} />
      <Footer />
    </>
  );
};

export default Error;
