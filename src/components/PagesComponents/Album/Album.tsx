// import React from "react";
// import styles from "./Album.module.scss";
// import { useParams } from "react-router-dom";
// import {
//   MotionValue,
//   motion,
//   useMotionValue,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import LocomotiveScroll from "locomotive-scroll";
// import ResizeObserver from "resize-observer-polyfill";

// const Album = () => {
//   const { albumName } = useParams();

//   const refAlbum = React.useRef<HTMLElement>(null);
//   const scrollXstate = useMotionValue(0);

//   React.useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       if (e.deltaY > 0) {
//         scrollXstate.set(scrollXstate.get() + 42);
//       } else {
//         if (scrollXstate.get() > 0) {
//           scrollXstate.set(scrollXstate.get() - 42);
//         }
//       }
//     };
//     document.addEventListener("wheel", (e) => {
//       handleWheel(e);
//     });
//     return () => {
//       document.removeEventListener("wheel", handleWheel);
//     };
//   });

//   const y1 = useSpring(useTransform(scrollXstate, [0, 2000], [0, -2450]), {
//     damping: 15,
//     mass: 0.27,
//     stiffness: 55,
//   });
//   const y2 = useSpring(useTransform(scrollXstate, [0, 2000], [0, -2200]), {
//     damping: 15,
//     mass: 0.27,
//     stiffness: 55,
//   });

//   const [startScroll, setStartScroll] = React.useState(false);

//   useMotionValueEvent(scrollXstate, "change", (latest) => {
//     // console.log("Page scroll: ", latest);
//     if (latest > 550) {
//       setStartScroll(true);
//     } else {
//       setStartScroll(false);
//     }
//   });

//   React.useEffect(() => {
//     let scroll: LocomotiveScroll = new LocomotiveScroll({});
//     if (refAlbum.current) {
//       scroll = new LocomotiveScroll({
//         el: refAlbum.current,
//         smooth: true,
//         direction: "horizontal",
//       });
//       if (startScroll) {
//         scroll.start();
//       } else {
//         scroll.stop();
//       }
//     }
//     return () => {
//       if (scroll) {
//         scroll.destroy();
//       }
//     };
//   }, [startScroll]);

//   return (
//     <motion.section
//       ref={refAlbum}
//       data-scroll-container
//       className={styles["album"]}
//     >
//       <div className={styles["album__heading__wrapper"]}>
//         <motion.div className={styles["album__heading"]}>
//           <motion.h2 style={{ y: y1 }} className="heading-1">
//             It's
//           </motion.h2>
//           <motion.h2
//             style={{ y: y2 }}
//             className={`${styles["album__heading--2"]} heading-2`}
//           >
//             {albumName}
//           </motion.h2>
//           <motion.h2 className="subtitle">loremlorem</motion.h2>
//         </motion.div>
//       </div>
//       <div className={styles["album__content"]}>
//         <Container1 x={scrollXstate} />
//         <div style={{ minWidth: "100vw", height: "100vh" }}></div>
//       </div>
//     </motion.section>
//   );
// };

// interface props {
//   x: MotionValue<number>;
// }

// const Container1: React.FC<props> = ({ x }) => {
//   return (
//     <div className={styles["album__content__img__wrapper"]}>
//       <motion.img
//         className={styles["album__content__img"]}
//         src="https://picsum.photos/500/750"
//         alt=""
//       />
//     </div>
//   );
// };

// export default Album;

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

const Album = () => {
  const { albumName } = useParams();

  const { scrollY } = useScroll();
  const springY = useSpring(scrollY, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let y = useTransform(springY, [0, 840], [0, 640]);

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

  const y1 = useSpring(useTransform(scrollY, [0, 920], [0, -850]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y2 = useSpring(useTransform(scrollY, [0, 850], [0, -700]), {
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
        <div className={styles["album__heading__wrapper"]}>
          <motion.div className={styles["album__heading"]}>
            <motion.h2 style={{ y: y1 }} className="heading-1">
              It's
            </motion.h2>
            <motion.h2
              style={{ y: y2 }}
              className={`${styles["album__heading--2"]} heading-2`}
            >
              {albumName}
            </motion.h2>
            <motion.h2 className="subtitle">loremlorem</motion.h2>
          </motion.div>
        </div>

        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="container"
        >
          <motion.section style={{ x: y }} className={styles["album"]}>
            <div style={{ width: "95vw", backfaceVisibility: "hidden" }}></div>
            <motion.div className={styles["album__content"]}>
              <Container1 />
              <Container2 />
              <Container1 />
              <Container2 />

              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  background: "orange",
                }}
              ></div>
            </motion.div>
          </motion.section>
        </motion.section>
      </div>

      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </>
  );
};

export default Album;

const Container1 = () => {
  const refContainer1 = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const springY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let yIMG = useTransform(springY, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={refContainer1} className={styles["album__content__container"]}>
      <motion.div className={styles["album__content__img__wrapper"]}>
        <motion.img
          style={{ x: yIMG }}
          className={styles["album__content__img"]}
          src="https://picsum.photos/500/750"
          alt=""
        />
      </motion.div>
    </div>
  );
};

const Container2 = () => {
  const refContainer = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({});
  const springY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let yIMG = useTransform(springY, [0, 1], ["0%", "-20%"]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });
  return (
    <div ref={refContainer} className={styles["album__content__container"]}>
      <motion.div className={styles["album__content__img__wrapper--2"]}>
        <motion.img
          style={{ x: yIMG }}
          className={styles["album__content__img--2"]}
          src="https://picsum.photos/500/750"
          alt=""
        />
      </motion.div>
    </div>
  );
};
