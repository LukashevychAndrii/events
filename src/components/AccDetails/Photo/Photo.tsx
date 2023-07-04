import React from "react";
import styles from "../AccDetails.module.scss";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";

import { ReactComponent as EditIcon } from "../../../img/SVG/edit.svg";
import { ReactComponent as DefaultAvatar } from "../../../img/SVG/default-avatar.svg";
import { ReactComponent as DeleteIcon } from "../../../img/SVG/delete.svg";

import NewPhoto from "./NewPhoto";
import { userRemovePhoto } from "../../../store/slices/user-slice";

const Photo = () => {
  const userDATA = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updatePhoto, setUpdatePhoto] = React.useState(false);
  const [newName, setNewName] = React.useState(userDATA.name);

  const handleEditPhotoClick = () => {};
  const handleClosePhotoClick = () => {
    setUpdatePhoto(false);
  };
  return (
    <>
      <div className={styles["acc-details__element"]}>
        <div>Photo:</div>
        {userDATA.photo ? (
          <img
            className={styles["acc-details__photo__img"]}
            src={userDATA.photo}
            alt="user"
          />
        ) : (
          <DefaultAvatar className={styles["acc-details__photo__img"]} />
        )}

        <DeleteIcon
          onClick={() => {
            dispatch(userRemovePhoto());
          }}
          className={styles["acc-details__edit-icon"]}
        ></DeleteIcon>

        <EditIcon
          className={styles["acc-details__edit-icon"]}
          onClick={() => setUpdatePhoto(true)}
        />
      </div>
      <NewPhoto updatePhoto={updatePhoto} setUpdatePhoto={setUpdatePhoto} />
    </>
  );
};

export default Photo;
