import React from "react";
import styles from "./Chats.module.scss";
import { ReactComponent as DefaultAvatar } from "../../img/SVG/default-avatar.svg";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/redux";
import {
  chatFetchChatsPartial,
  chatFetchMembers,
  chatFetchMessages,
  chatFetchUserChats,
} from "../../store/slices/chat-slice";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import TopBar from "./Chat/ChatComponents/TopBar/TopBar";

import logo from "../../img/logo.png";
import { Variants, motion } from "framer-motion";

const variantsChat: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
};

interface props {
  outlet: JSX.Element;
}

let FIRST_RENDER = true;

const Chats: React.FC<props> = ({ outlet }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userID = useAppSelector((state) => state.user.ID);
  const chatsList = useAppSelector((state) => state.chat.allChats);

  const { chatID } = useParams();
  React.useEffect(() => {
    if (chatID) {
      dispatch(chatFetchMembers({ chatID }));
      dispatch(chatFetchMessages({ chatID }));
    }
  }, [dispatch, chatID]);

  React.useEffect(() => {
    if (chatID) {
      if (!Object.keys(chatsList).includes(chatID)) {
        navigate("/events/chats");
      }
    }
  }, [chatID, chatsList, navigate]);

  React.useEffect(() => {
    dispatch(chatFetchChatsPartial());
  }, [dispatch, userID]);
  React.useEffect(() => {
    if (userID && Object.keys(chatsList).length > 0 && FIRST_RENDER) {
      FIRST_RENDER = false;
      dispatch(chatFetchUserChats());
    }
  }, [userID, chatsList, dispatch]);

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(300);

  const [small, setSmall] = React.useState(false);

  const startResizing = React.useCallback(
    (mouseDownEvent: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsResizing(true);
      setSmall(false);
    },
    []
  );

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        if (
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left <
          250
        ) {
          console.log("QWe");
          setSmall(true);
        }
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const [filter, setFilter] = React.useState<string>("");

  React.useEffect(() => {
    console.log(Object.values(chatsList));
  }, [chatsList]);

  const prevRoute = useLocation();

  return (
    <motion.div
      transition={{ duration: 1 }}
      initial={{ opacity: 0, filter: "blur(50px)" }}
      animate={{ opacity: 1, filter: "blur(0)" }}
      exit={{
        opacity: 0,
        filter: "blur(50px)",
        y: 150,
        transition: { duration: 1.5 },
      }}
    >
      <div className={styles["app-container"]}>
        <div
          ref={sidebarRef}
          className={styles["app-sidebar"]}
          style={{ width: sidebarWidth }}
          // onMouseDown={(e) => e.preventDefault()}
        >
          <Link
            className={styles["app-container__link"]}
            to="/events/"
            state={{ prevRoute: prevRoute.pathname }}
          >
            <img
              className={styles["app-container__logo"]}
              src={logo}
              alt="logo"
            />
          </Link>
          <TopBar setFilter={setFilter} small={small} />

          <SimpleBar style={{ height: "100%", width: "100%" }}>
            <div className={styles["app-sidebar__content"]}>
              <ul className={styles["app-sidebar__content__chats-list"]}>
                {Object.values(chatsList)
                  .filter((el) => el.name.includes(filter))
                  .map((el, index) => (
                    <motion.li
                      variants={variantsChat}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      key={index}
                      className={
                        styles["app-sidebar__content__chats-list__chat"]
                      }
                    >
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? styles[
                                "app-sidebar__content__chats-list__chat__link--active"
                              ]
                            : styles[
                                "app-sidebar__content__chats-list__chat__link"
                              ]
                        }
                        to={`/events/chats/${Object.keys(chatsList)[index]}`}
                      >
                        {el.photo ? (
                          <div
                            className={
                              styles[
                                "app-sidebar__content__chats-list__chat__img"
                              ]
                            }
                            style={{ backgroundImage: `url(${el.photo})` }}
                          ></div>
                        ) : (
                          <DefaultAvatar
                            className={
                              styles[
                                "app-sidebar__content__chats-list__chat__img"
                              ]
                            }
                          />
                        )}
                        <div
                          className={
                            styles[
                              "app-sidebar__content__chats-list__chat__name"
                            ]
                          }
                        >
                          {el.name}
                        </div>
                        <div
                          className={
                            styles[
                              "app-sidebar__content__chats-list__chat__last-msg"
                            ]
                          }
                        >
                          {el.lastMessageDATA && el.lastMessageDATA.text
                            ? el.lastMessageDATA.text
                            : "..."}
                        </div>

                        {el.lastMessageDATA && el.lastMessageDATA.time && (
                          <span
                            className={
                              styles[
                                "app-sidebar__content__chats-list__chat__last-msg__time"
                              ]
                            }
                          >
                            {el.lastMessageDATA.time}
                          </span>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
              </ul>
            </div>
          </SimpleBar>
          <div
            className={styles["app-sidebar__resizer"]}
            onMouseDown={(e) => startResizing(e)}
          />
        </div>
        <div className={styles["app-frame"]}>{outlet}</div>
      </div>
    </motion.div>
  );
};
export default Chats;
