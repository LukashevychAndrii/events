import React from "react";
import styles from "./Chats.module.scss";
import { ReactComponent as DefaultAvatar } from "../../img/SVG/default-avatar.svg";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/redux";
import { chatFetchChatsPartial } from "../../store/slices/chat-slice";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import TopBar from "./Chat/ChatComponents/TopBar/TopBar";
interface props {
  outlet: JSX.Element;
}

const Chats: React.FC<props> = ({ outlet }) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(chatFetchChatsPartial());
  }, [dispatch]);

  const chatsList = useAppSelector((state) => state.chat.chatsList);

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(300);

  React.useEffect(() => {
    if (sidebarWidth <= 250) {
      setSidebarWidth(80);
    }
  }, [sidebarWidth]);
  const startResizing = React.useCallback(
    (mouseDownEvent: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsResizing(true);
    },
    []
  );

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
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

  return (
    <div className={styles["app-container"]}>
      <div
        ref={sidebarRef}
        className={styles["app-sidebar"]}
        style={{ width: sidebarWidth }}
        // onMouseDown={(e) => e.preventDefault()}
      >
        <TopBar />

        <SimpleBar style={{ height: "100%", width: "100%" }}>
          <div className={styles["app-sidebar__content"]}>
            <ul className={styles["app-sidebar__content__chats-list"]}>
              {Object.values(chatsList).map((el, index) => (
                <li
                  key={index}
                  className={styles["app-sidebar__content__chats-list__chat"]}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? styles[
                            "app-sidebar__content__chats-list__chat__link--active"
                          ]
                        : styles["app-sidebar__content__chats-list__chat__link"]
                    }
                    to={`${Object.keys(chatsList)[index]}`}
                  >
                    {el.photo ? (
                      <div
                        className={
                          styles["app-sidebar__content__chats-list__chat__img"]
                        }
                        style={{ backgroundImage: `url(${el.photo})` }}
                      ></div>
                    ) : (
                      <DefaultAvatar
                        className={
                          styles["app-sidebar__content__chats-list__chat__img"]
                        }
                      />
                    )}
                    <div
                      className={
                        styles["app-sidebar__content__chats-list__chat__name"]
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
                      Lorem, ipsum dolor sit amet consectetur
                    </div>
                  </NavLink>
                </li>
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
  );
};
export default Chats;
