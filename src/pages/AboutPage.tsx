import React from "react";
import About from "../components/PagesComponents/About/About";
import { motion } from "framer-motion";

const AboutPage = () => {
  const AnimatedAbout = motion(About);
  return <AnimatedAbout />;
};

export default AboutPage;
