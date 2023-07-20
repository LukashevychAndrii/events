import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";
import Heading from "./Heading/Heading";

import Container1 from "./Containers/Container1/Container1";
import Container2 from "./Containers/Container2/Container2";
import Container3 from "./Containers/Container3/Container3";
import Container4 from "./Containers/Container4/Container4";
import { useAppDispatch, useAppSelector } from "../../../../utils/redux";
import { recentEventsFetch } from "../../../../store/slices/recentEvents-slice";

export const variantsFadeIn = {
  initial: {
    opacity: 0,
  },
  hover: { opacity: 1, transition: { delay: 0.2, duration: 1 } },
};
export const vatiantsMoveTop = {
  initial: {
    y: "3.5rem",
    transition: { duration: 0.5 },
  },
  hover: {
    y: 0,
    transition: { duration: 0.5 },
  },
};
export const vatiantsMoveBot = {
  initial: {
    y: "-3.5rem",
    transition: { duration: 0.5 },
  },
  hover: {
    y: 0,
    transition: { duration: 0.5 },
  },
};

const MainContent = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(recentEventsFetch());
  }, [dispatch]);

  const events = useAppSelector((state) => state.recentEvents.eventsDATA);
  return (
    <div className={styles["content"]}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className={styles["content__heading"]}
      >
        <Heading />
      </motion.section>
      <section className={styles["content__container__wrapper"]}>
        <Container1 eventDATA={events[0]} />
        <Container2 eventDATA={events[5]} />
        <Container3 eventDATA={events[7]} />
        <Container4 eventDATA={events[3]} />
      </section>
    </div>
  );
};

export default MainContent;
