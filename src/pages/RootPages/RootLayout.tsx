import { AnimatePresence } from "framer-motion";
import React from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutlet,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation/Navigation";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import AlbumPage from "../AlbumPage";
import PendingBar from "../../components/PendingBar/PendingBar";
import AlertBox from "../../components/AlertBox/AlertBox";
import NavPage from "../../components/Navigation/NavPage/NavPage";
import Chats from "../../components/Chats/Chats";

const RootLayout = () => {
  const location = useLocation();
  const AnimatedOutlet: React.FC = () => {
    const o = useOutlet();
    const [outlet] = React.useState(o);

    return <>{outlet}</>;
  };

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  React.useEffect(() => {
    if (!pathname.includes("calendar")) {
      if (searchParams.get("month") && searchParams.get("day")) {
        searchParams.delete("month");
        searchParams.delete("day");
        setSearchParams(searchParams);
      }
    }
  }, [pathname, navigate, searchParams, setSearchParams]);

  const [showNavPage, setShowNavPage] = React.useState(false);

  React.useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0 });
    };

    scrollToTop();
  }, [pathname]);

  return (
    <>
      <NavPage setShowNavPage={setShowNavPage} showNavPage={showNavPage} />

      {pathname !== "/events/" && <AlertBox />}

      <PendingBar />

      {!pathname.includes("chats") && (
        <>
          {pathname !== "/events/" ? (
            <Navigation
              white={showNavPage}
              setShowNavPage={setShowNavPage}
              showNavPage={showNavPage}
            />
          ) : (
            <AnimatePresence>
              <Navigation
                white={true}
                setShowNavPage={setShowNavPage}
                showNavPage={showNavPage}
              />
            </AnimatePresence>
          )}
        </>
      )}

      <AnimatePresence mode="wait">
        {pathname.includes("album") ? (
          <AlbumPage key="album" />
        ) : pathname.includes("chats") ? (
          <Chats key="chats" outlet={<AnimatedOutlet />} />
        ) : (
          <SmoothScroll>
            <motion.div
              key="main"
              initial={{ opacity: 0, filter: "blur(50px)" }}
              animate={{ opacity: 1, filter: "blur(0)" }}
              exit={{
                opacity: 0,
                filter: "blur(50px)",
                y: 150,
                transition: { duration: 1.5 },
              }}
              transition={{ duration: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.main
                  key={location.pathname}
                  initial={{ opacity: 0, filter: "blur(50px)" }}
                  animate={{ opacity: 1, filter: "blur(0)" }}
                  exit={{
                    opacity: 0,
                    filter: "blur(50px)",
                    y: 150,
                    transition: { duration: 1.5 },
                  }}
                  transition={{ duration: 1 }}
                >
                  <AnimatedOutlet />
                </motion.main>
              </AnimatePresence>
            </motion.div>
          </SmoothScroll>
        )}
      </AnimatePresence>
    </>
  );
};

export default RootLayout;
