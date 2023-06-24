import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation/Navigation";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";

const RootLayout = () => {
  const location = useLocation();
  const AnimatedOutlet: React.FC = () => {
    const o = useOutlet();
    const [outlet] = React.useState(o);

    return <>{outlet}</>;
  };
  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <SmoothScroll>
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(50px)" }}
            animate={{ opacity: 1, filter: "blur(0)" }}
            exit={{ opacity: 0, filter: "blur(50px)" }}
            transition={{ duration: 1 }}
          >
            <AnimatedOutlet />
          </motion.main>
        </SmoothScroll>
      </AnimatePresence>
    </>
  );
};

export default RootLayout;
