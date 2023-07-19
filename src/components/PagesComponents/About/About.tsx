import React from "react";
import styles from "./About.module.scss";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Textfit } from "react-textfit";

const variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 0.2 },
  },
};

const Service = ({ text }: { text: string }) => {
  return (
    <motion.li
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text}
    </motion.li>
  );
};

const People = ({ text }: { text: string }) => {
  return (
    <motion.li
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <p>{text}</p>
      <span></span>
    </motion.li>
  );
};

const About = () => {
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 1800], [350, 1250]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const yh6 = useSpring(useTransform(scrollY, [0, 1000], [300, -600]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const yh3 = useSpring(useTransform(scrollY, [0, 1000], [300, -450]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const yh4 = useSpring(useTransform(scrollY, [0, 1000], [300, -300]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const yh5 = useSpring(useTransform(scrollY, [0, 1000], [300, -150]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const headingVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const refIMG = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refIMG,
    offset: ["start end", "end start"],
  });

  const springY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let yIMG = useTransform(springY, [0, 1], ["-30%", "10%"]);

  const ref123 = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref123,
    offset: ["start end", "end start"],
  });

  const temp = useSpring(scrollYProgress1, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

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

  const spring123 = useTransform(temp, [0, 1], ["-100%", "55%"]);

  return (
    <motion.section className={styles["about"]}>
      <div className={styles["about__heading__wrapper"]}>
        <motion.div
          variants={headingVariants}
          initial="initial"
          animate="visible"
          transition={{ duration: 0.6, delay: 1 }}
          className={styles["about__heading"]}
        >
          <motion.h6
            style={{ y: yh6 }}
            className={`${styles["about__heading__h6"]} heading-1`}
          >
            <Textfit mode="single" min={1} max={200}>
              Lorem lorem
            </Textfit>
          </motion.h6>
          <motion.h3
            style={{ y: yh3 }}
            className={`${styles["about__heading__h3"]} heading-2`}
          >
            <Textfit mode="single" min={1} max={400}>
              Loremloremlorem
            </Textfit>
          </motion.h3>
          <div className={styles["about__heading__right"]}>
            <motion.h4
              style={{ y: yh4 }}
              className={`${styles["about__heading__h4"]} heading-1`}
            >
              <Textfit mode="single" min={1} max={200}>
                Lorem, ips
              </Textfit>
            </motion.h4>
            <motion.h5
              style={{ y: yh5 }}
              className={`${styles["about__heading__h5"]} heading-2`}
            >
              <Textfit mode="single" min={1} max={200}>
                Loremlore
              </Textfit>
            </motion.h5>
          </div>
        </motion.div>
      </div>
      <div className={styles["about__content"]}>
        <div ref={refIMG} className={styles["about__content__main"]}>
          <motion.div
            style={{ y: less768 ? "-100%" : spring123 }}
            className={styles["about__content__img__wrapper"]}
          >
            <motion.img
              style={{ y: yIMG }}
              transition={{ duration: 1 }}
              className={styles["about__content__img"]}
              src="https://picsum.photos/500/750"
              alt="event"
            />
          </motion.div>
          <div
            ref={ref123}
            className={styles["about__content__main__text__wrapper"]}
          >
            <h2 className="subtitle u-mb-sm">About us</h2>
            <div className={styles["about__content__main__text"]}>
              <p>
                <Textfit mode="single" min={1} max={200}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  Molestias numquam quas saepe inventore, enim quod
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  nisi odit alias? Quasi doloremque quisquam molestias
                </Textfit>
                <div style={{ width: "27.5%" }}>
                  <Textfit mode="single" min={1} max={200}>
                    suscipit lorem.
                  </Textfit>
                </div>
              </p>
              <p>
                <Textfit mode="single" min={1} max={200}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  Molestias numquam quas saepe inventore, enim quod
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  nisi odit alias? Quasi doloremque quisquam molestias
                </Textfit>
                <div style={{ width: "27.5%" }}>
                  <Textfit mode="single" min={1} max={200}>
                    suscipit lorem.
                  </Textfit>
                </div>
              </p>
              <p>
                <Textfit mode="single" min={1} max={200}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  Molestias numquam quas saepe inventore, enim quod
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  nisi odit alias? Quasi doloremque quisquam molestias
                </Textfit>
                <div style={{ width: "27.5%" }}>
                  <Textfit mode="single" min={1} max={200}>
                    suscipit lorem.
                  </Textfit>
                </div>
              </p>
              <p>
                <Textfit mode="single" min={1} max={200}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  Molestias numquam quas saepe inventore, enim quod
                </Textfit>
                <Textfit mode="single" min={1} max={200}>
                  nisi odit alias? Quasi doloremque quisquam molestias
                </Textfit>
                <div style={{ width: "27.5%" }}>
                  <Textfit mode="single" min={1} max={200}>
                    suscipit lorem.
                  </Textfit>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles["about__content__services"]} u-mt-elg`}>
          <h2 className="subtitle u-mb-sm">Services</h2>
          <ol>
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
            <Service text="Lorem, ipsum" />
          </ol>
        </div>
        <div className={`${styles["about__content__people"]} u-mt-elg`}>
          <h2 className="subtitle u-mb-sm">Clients / Collaborators</h2>
          <ul>
            <People text="Lorem, ipsum do" />
            <People text="Lorem, ipsum dolor." />
            <People text="Lorem, ipsum." />
            <People text="Lorem, ips." />
            <People text="Lorem, ipsum dolor." />
            <People text="Lorem, ipsum." />
            <People text="Lorem, ipsum." />
            <People text="Lorem, ipsum." />
          </ul>
        </div>
      </div>
      <div style={{ height: "100vh" }}></div>
    </motion.section>
  );
};

export default About;
