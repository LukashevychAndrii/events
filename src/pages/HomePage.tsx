import React from "react";
import Intro from "../components/PagesComponents/Home/Intro/Intro";
import MainContent from "../components/PagesComponents/Home/MainContent/MainContent";

import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation/Navigation";

const HomePage = () => {
  const [showIntro, setShowIntro] = React.useState(true);

  return (
    <>
      <motion.div>
        <Navigation />
      </motion.div>
      <AnimatePresence>
        {showIntro && <Intro setShowIntro={setShowIntro} />}
      </AnimatePresence>
      <AnimatePresence>{!showIntro && <MainContent />}</AnimatePresence>
    </>
  );
};

export default HomePage;
