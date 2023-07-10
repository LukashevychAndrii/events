import React, { FormEvent } from "react";
import styles from "../../../Chats.module.scss";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useClickOutside from "../../../../../hooks/useClickOutside";

interface props {
  showNewContact: boolean;
  setShowNewContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantsNewContant: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const AddUser: React.FC<props> = ({ showNewContact, setShowNewContact }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const outside = useClickOutside({ ref });

  React.useEffect(() => {
    if (outside) {
      setShowNewContact(false);
    }
  }, [outside, setShowNewContact]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().length > 0) {
    }
  };

  const [value, setValue] = React.useState<string>("");

  return (
    <AnimatePresence>
      {showNewContact && (
        <motion.div
          transition={{ duration: 0.4 }}
          ref={ref}
          variants={variantsNewContant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles["app-sidebar__content__add-user"]}
        >
          <div className="subtitle">New Contact</div>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter user ID"
              type="text"
              name="add-user"
              id="add-user"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="add-user"></label>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddUser;
