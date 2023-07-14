import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation/Navigation";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import AlbumPage from "../AlbumPage";

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
      {pathname.length > 1 ? (
        <Navigation />
      ) : (
        <AnimatePresence>
          <Navigation white={true} />
        </AnimatePresence>
      )}

      {pathname.includes("album") ? (
        <AlbumPage />
      ) : (
        <SmoothScroll>
          <AnimatePresence mode="wait">
            <motion.main
              style={{ minHeight: "100vh" }}
              key={location.pathname}
              initial={{ opacity: 0, filter: "blur(50px)" }}
              animate={{ opacity: 1, filter: "blur(0)" }}
              exit={{ opacity: 0, filter: "blur(50px)", y: 100 }}
              transition={{ duration: 1 }}
            >
              <AnimatedOutlet />
            </motion.main>
          </AnimatePresence>
        </SmoothScroll>
      )}
    </>
  );
};

export default RootLayout;
