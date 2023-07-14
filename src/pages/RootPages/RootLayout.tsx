import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation/Navigation";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import AlbumPage from "../AlbumPage";
import PendingBar from "../../components/PendingBar/PendingBar";

const RootLayout = () => {
  const location = useLocation();
  const AnimatedOutlet: React.FC = () => {
    const o = useOutlet();
    const [outlet] = React.useState(o);

    return <>{outlet}</>;
  };

  const { pathname } = useLocation();

  return (
    <>
      <PendingBar />
      {pathname.length > 1 ? (
        <Navigation />
      ) : (
        <AnimatePresence>
          <Navigation white={true} />
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        {pathname.includes("album") ? (
          <AlbumPage key="album" />
        ) : (
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
            <SmoothScroll>
              <AnimatePresence mode="wait">
                <motion.main
                  style={{ minHeight: "100vh" }}
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
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RootLayout;
