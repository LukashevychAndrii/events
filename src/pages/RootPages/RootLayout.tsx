import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";

const RootLayout = () => {
  const location = useLocation();
  const AnimatedOutlet: React.FC = () => {
    const o = useOutlet();
    const [outlet] = React.useState(o);

    return <>{outlet}</>;
  };
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, filter: "blur(50px)" }}
        animate={{ opacity: 1, filter: "blur(0)" }}
        exit={{ opacity: 0, filter: "blur(50px)" }}
        transition={{ duration: 1 }}
      >
        <AnimatedOutlet />
      </motion.main>
    </AnimatePresence>
  );
};

export default RootLayout;
