import React from "react";
import styles from "./NewPhoto.module.scss";

import { AnimatePresence, Variants, motion } from "framer-motion";
import Avatar from "react-avatar-edit";
import logo from "../../../img/logo.png";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import { userUpdatePhoto } from "../../../store/slices/user-slice";
interface props {
  updatePhoto: boolean;
  setUpdatePhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantsNewPhoto: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(50px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0)",
  },
};

const NewPhoto: React.FC<props> = ({ updatePhoto, setUpdatePhoto }) => {
  const dispatch = useAppDispatch();
  const [drag, setDrag] = React.useState(false);

  const [loadedImg, setLoadedImg] = React.useState<string>("");

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setLoadedImg(base64String);
      };
      reader.readAsDataURL(file);
      setDrag(false);
    }
  };

  const onCrop = (img: string) => {
    setLoadedImg(img);
  };
  const handleUpdatePhotoClick = () => {
    if (loadedImg) {
      dispatch(userUpdatePhoto({ photo: loadedImg }));
      setUpdatePhoto(false);
    }
  };

  return (
    <AnimatePresence>
      {updatePhoto && (
        <motion.div
          variants={variantsNewPhoto}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          className={styles["new-photo__wrapper"]}
        >
          <div
            // onDragStart={(e) => {
            //   handleDragStart(e);
            // }}
            // onDragLeave={(e) => {
            //   handleDragLeave(e);
            // }}
            // onDragOver={(e) => {
            //   handleDragStart(e);
            // }}
            // onDrop={(e) => {
            //   handleOnDrop(e);
            // }}
            className={styles["new-photo__drop-area"]}
          >
            <Avatar
              onCrop={(img) => {
                onCrop(img);
              }}
              width={600}
              height={450}
            />
            <div className={styles["new-photo__buttons"]}>
              <button
                className={styles["new-photo__buttons__button"]}
                onClick={handleUpdatePhotoClick}
              >
                Change
              </button>
              <button
                className={styles["new-photo__buttons__button"]}
                onClick={() => {
                  setUpdatePhoto(false);
                  setLoadedImg("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewPhoto;
