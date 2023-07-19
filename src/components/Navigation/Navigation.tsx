import React from "react";
import styles from "./Navigation.module.scss";
import ProgressBar from "./ProgressBar/ProgressBar";
import { useLocation } from "react-router-dom";
import {
  AnimatePresence,
  Variants,
  useAnimationControls,
  useScroll,
  useSpring,
} from "framer-motion";
import { motion } from "framer-motion";
import User from "./User/User";
import Logo from "./Logo/Logo";
import Links1 from "./Links/Links1";
import Links2 from "./Links/Links2";

interface props {
  white?: boolean;
  setShowNavPage: React.Dispatch<React.SetStateAction<boolean>>;
  showNavPage: boolean;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    pointerEvents: "all",
  },
};

const Navigation: React.FC<props> = ({
  white,
  setShowNavPage,
  showNavPage,
}) => {
  const navControls = useAnimationControls();
  const [showNav, setShowNav] = React.useState(true);

  React.useEffect(() => {
    if (showNav) {
      navControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    } else {
      navControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [showNav, navControls]);

  const [hover, setHover] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const scrollY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  React.useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  const [scrollYPersentage, setScrollYPersentage] = React.useState(0);

  React.useLayoutEffect(() => {
    const scrollChangeHandler = (y: number) => {
      const scrollYPersentage = +y.toString().split(".")[1]?.slice(0, 2);
      if (scrollYPersentage) {
        setScrollYPersentage(scrollYPersentage);
      }
    };

    scrollY.on("change", scrollChangeHandler);

    return () => {
      scrollY.destroy();
    };
  }, [scrollY]);

  React.useEffect(() => {
    if (scrollYPersentage > 1 && !hover) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [scrollYPersentage, hover]);

  const handleScrollEnd = () => {
    const container = document.body;
    const isScrolledToEnd =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    if (isScrolledToEnd) {
      setHover(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);
  const location = useLocation();

  const [animationKey, setAnimationKey] = React.useState(0);

  const [delay, setDelay] = React.useState(8.5);

  React.useEffect(() => {
    if (location.state) {
      if (location.state.prevRoute !== "/events/") {
        setDelay(10);
      } else {
        setDelay(8.5);
      }
    } else {
      setDelay(8.5);
    }
    if (location.pathname === "/events/") {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [location]);

  const [less768, setLess768] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLess768(true);
      } else {
        setLess768(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.nav
      key={animationKey}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, delay: white ? delay : 0 }}
      className={styles["nav"]}
    >
      <User white={white} />
      <Logo white={white} />
      <div className={styles["nav__nav-main"]}>
        {less768 && <span></span>}
        {!showNavPage && !less768 && <Links1 showNav={showNav} white={white} />}
        {!showNavPage && (
          <div
            onMouseEnter={() => {
              if (!less768) {
                setHover(true);
              }
            }}
            onClick={() => {
              if (less768) {
                setShowNavPage(true);
              }
            }}
            className={styles["nav__nav-circle"]}
          >
            <ProgressBar
              white={white}
              scrollYPersentage={scrollYPersentage}
              hide={!showNav}
            />
          </div>
        )}
        {!showNavPage && !less768 && <Links2 showNav={showNav} white={white} />}
      </div>
    </motion.nav>
  );
};

export default Navigation;
