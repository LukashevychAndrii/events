import React from "react";
import styles from "../../Album.module.scss";

const People = () => {
  return (
    <div className={styles["album__content__people__wrapper"]}>
      <div className={styles["album__content__people"]}>
        <div>
          <h3
            className={`${styles["album__content__people__heading"]} subtitle`}
          >
            Lorem
          </h3>
          <h4 className={`${styles["album__content__people__heading"]} `}>
            Lorem, ipsum.
          </h4>
        </div>
        <div>
          <h3
            className={`${styles["album__content__people__heading"]} subtitle`}
          >
            Lorem
          </h3>
          <h4 className={`${styles["album__content__people__heading"]} `}>
            Lorem, ipsum.
          </h4>
        </div>
        <div>
          <h3
            className={`${styles["album__content__people__heading"]} subtitle`}
          >
            Lorem
          </h3>
          <h4 className={`${styles["album__content__people__heading"]} `}>
            Lorem, ipsum.
          </h4>
        </div>
        <div>
          <h3
            className={`${styles["album__content__people__heading"]} subtitle`}
          >
            Lorem
          </h3>
          <h4 className={`${styles["album__content__people__heading"]} `}>
            Lorem, ipsum.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default People;
