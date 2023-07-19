import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import styles from "./Album.module.scss";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useParams } from "react-router-dom";
import Container1 from "./components/Container1/Container1";
import Container2 from "./components/Container2/Container2";
import People from "./components/People/People";

import { Textfit } from "react-textfit";

const Album = () => {
  const { albumName } = useParams();

  const [name, setName] = React.useState("");
  React.useEffect(() => {
    if (albumName) {
      setName(albumName);
    }
  }, [albumName]);

  const { scrollY } = useScroll();
  const springY = useSpring(scrollY, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let y = useTransform(springY, [0, 840], [0, 739]);

  const [startScroll, setStartScroll] = React.useState(false);

  const scrollXstate = useMotionValue(0);

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        scrollXstate.set(scrollXstate.get() + 42);
      } else {
        if (scrollXstate.get() > 0) {
          scrollXstate.set(scrollXstate.get() - 42);
        }
      }
    };
    document.addEventListener("wheel", (e) => {
      handleWheel(e);
    });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [startScroll]);

  useMotionValueEvent(scrollXstate, "change", (latest) => {
    if (latest > 840) {
      setStartScroll(true);
    } else {
      setStartScroll(false);
    }
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
  });

  const y1 = useSpring(useTransform(scrollY, [0, 920], [0, -900]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y2 = useSpring(useTransform(scrollY, [0, 850], [0, -750]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y3 = useSpring(useTransform(scrollY, [0, 950], [0, -800]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

  const scrollRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      setScrollRange(scrollRef.current.scrollWidth);
    }
  }, [scrollRef, viewportW]);

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    if (ghostRef.current) {
      resizeObserver.observe(ghostRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll();

  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <div className="scroll-container">
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
          className={styles["album__heading__wrapper"]}
        >
          <div className={styles["album__heading"]}>
            <motion.h2
              style={{ y: y1 }}
              className={`${styles["album__heading--1"]} heading-1`}
            >
              <Textfit mode="single" min={40} max={175}>
                It's
              </Textfit>
            </motion.h2>
            <motion.h2
              style={{ y: y2 }}
              className={`${styles["album__heading--2"]} heading-2`}
            >
              <Textfit mode="single" min={20} max={150}>
                {name}
              </Textfit>
            </motion.h2>
            <motion.h2 style={{ y: y3 }} className="subtitle">
              loremlorem
            </motion.h2>
          </div>
        </motion.div>

        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="container"
        >
          <motion.section style={{ x: y }} className={styles["album"]}>
            <div style={{ width: "95vw", backfaceVisibility: "hidden" }}></div>
            <motion.div className={styles["album__content"]}>
              <Container1 photo="https://images.unsplash.com/photo-1501694159270-7b55f5eb85fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" />
              <Container2 photo="https://images.unsplash.com/photo-1603910234616-3b5f4a6be2b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" />
              <Container1 photo="https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" />
              <Container2 photo="https://images.unsplash.com/photo-1565035010268-a3816f98589a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" />
              <Container1 photo="https://images.unsplash.com/photo-1569930784237-ea65a2f40a83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=712&q=80" />

              <People />
              {/* <div style={{ width: "39.45vw" }}></div> */}
            </motion.div>
          </motion.section>
        </motion.section>
      </div>

      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </>
  );
};

export default Album;
