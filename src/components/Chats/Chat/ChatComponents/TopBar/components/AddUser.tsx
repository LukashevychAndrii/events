import React, { FormEvent } from "react";
import styles from "../../../../Chats.module.scss";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useClickOutside from "../../../../../../hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";
import { userFindUser } from "../../../../../../store/slices/user-slice";
import { foundUserData } from "../../../../../../store/slices/user-slice";

import { ReactComponent as DefaultAvatar } from "../../../../../../img/SVG/default-avatar.svg";
import {
  chatAddUserChat,
  userDATA,
} from "../../../../../../store/slices/chat-slice";

interface props {
  showNewContact: boolean;
  setShowNewContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantsNewContant: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};
const qwe: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const AddUser: React.FC<props> = ({ showNewContact, setShowNewContact }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const outside = useClickOutside({ ref });

  React.useEffect(() => {
    if (outside) {
      setShowNewContact(false);
      setUser(null);
      setEnteredID("");
    }
  }, [outside, setShowNewContact]);

  const [user, setUser] = React.useState<foundUserData | null>(null);
  const currentUserID = useAppSelector((state) => state.user.ID);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser(null);
    if (enteredID.trim().length > 0) {
      if (enteredID !== currentUserID) {
        const userData = dispatch(userFindUser({ ID: enteredID }));
        userData.then((s) => {
          console.log(s.payload);
          setUser(s.payload as foundUserData | null);
        });
      } else {
        console.log("same");
      }
    }
  };

  const [enteredID, setEnteredID] = React.useState<string>("");

  const handleCancelClick = () => {
    setUser(null);
    setEnteredID("");
  };
  const handleCreateClick = () => {
    if (enteredID && user && user.name) {
      const newUserDATA: userDATA = {
        userID: enteredID,
        userNAME: user?.name,
        userPHOTO: user?.photo,
      };
      dispatch(chatAddUserChat({ userDATA: newUserDATA }));
    }
  };

  return (
    <>
      <AnimatePresence>
        {showNewContact && (
          <motion.div
            transition={{ duration: 0.4 }}
            ref={ref}
            variants={variantsNewContant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles["app-sidebar__content__add-user"]}
          >
            <div className="subtitle">New Contact</div>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter user ID"
                type="text"
                name="add-user"
                id="add-user"
                value={enteredID}
                onChange={(e) => setEnteredID(e.target.value)}
                autoFocus
              />
              <label htmlFor="add-user"></label>
            </form>
            <AnimatePresence>
              {user && (
                <motion.div
                  className={styles["app-sidebar__content__add-user__data"]}
                  transition={{ duration: 0.4 }}
                  variants={qwe}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {user.photo ? (
                    <img
                      className={
                        styles["app-sidebar__content__add-user__data__img"]
                      }
                      src={user.photo}
                      alt="found user"
                    />
                  ) : (
                    <DefaultAvatar
                      className={
                        styles["app-sidebar__content__add-user__data__img"]
                      }
                    />
                  )}
                  <div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                  <div
                    className={
                      styles["app-sidebar__content__add-user__buttons"]
                    }
                  >
                    <button
                      onClick={handleCreateClick}
                      className={
                        styles[
                          "app-sidebar__content__add-user__buttons__button"
                        ]
                      }
                    >
                      Create
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className={
                        styles[
                          "app-sidebar__content__add-user__buttons__button"
                        ]
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddUser;
