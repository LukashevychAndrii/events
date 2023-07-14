import React from "react";
import styles from "./PendingBar.module.scss";
import { useAppSelector } from "../../utils/redux";

const PendingBar = () => {
  const queue = useAppSelector((state) => state.pending.pendingQueue);
  React.useEffect(() => {
    console.log(queue);
  }, [queue]);
  return <>{queue > 0 && <div className={styles["pending-bar"]}></div>}</>;
};

export default PendingBar;
