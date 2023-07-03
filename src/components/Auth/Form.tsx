import React, { FormEvent } from "react";
import styles from "./Form.module.scss";
import { Link } from "react-router-dom";

import { ReactComponent as Eye } from "../../img/SVG/eye.svg";
import { ReactComponent as EyeSlash } from "../../img/SVG/eye-closed.svg";

import logo from "../../img/logo.png";

interface props {
  current: string;

  handleClick: (email: string, pass: string, userName: string) => void;
}

const Form = ({ current, handleClick }: props) => {
  const [showPass, setShowPass] = React.useState<boolean>(false);

  const [userName, setUserName] = React.useState("");
  const [userNameTouched, setUserNameTouched] = React.useState<boolean>(false);
  const [userNameError, setUserNameError] = React.useState<string>(
    "Please, enter a valid User Name!"
  );

  const [email, setEmail] = React.useState("");
  const [emailTouched, setEmailTouched] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>(
    "Please, enter a valid email!"
  );
  const [pass, setPass] = React.useState("");
  const [passTouched, setPassTouched] = React.useState<boolean>(false);
  const [passError, setPassError] = React.useState<string>(
    "Please, enter a valid password!"
  );

  const [formValid, setFormValid] = React.useState<boolean>(false);

  function eyeClickHandler() {
    setShowPass(!showPass);
  }
  React.useEffect(() => {
    if (emailError || passError || userNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passError, userNameError]);

  function userNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim().length < 4) {
      setUserNameError("Min length of user name is 4");
    } else if (e.target.value.trim().length > 10) {
      setUserNameError("Max length of user name is 10");
    } else {
      setUserNameError("");
    }
    setUserName(e.target.value);
  }
  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(e.target.value)) {
      setEmailError("Please enter a valid email!");
    } else if (e.target.value.trim().length > 30) {
      setEmailError("Please enter a valid email!");
    } else {
      setEmailError("");
    }
  }
  function passChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim().length < 6) {
      setPassError("Min length of password is 6");
    } else if (e.target.value.trim().length > 20) {
      setPassError("Max length of password is 20");
      return;
    } else {
      setPassError("");
    }
    setPass(e.target.value);
  }

  function emailBlurHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case "email":
        setEmailTouched(true);
        break;
      case "pass":
        setPassTouched(true);
        break;
      case "userName":
        setUserNameTouched(true);
        break;
    }
  }

  return (
    <div className={styles["form__wrapper"]}>
      <div className={styles["form__right"]}>
        <form
          className={styles["form"]}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
        >
          <div className={styles["form__heading"]}>
            <div className={styles["form__heading__heading"]}>
              <img
                className={styles["form__heading__logo"]}
                src={logo}
                alt="logo"
              />
              <h1 className="subtitle">Lorem</h1>
            </div>
            <div className={styles["form__heading__text"]}>
              {current === "Sign In"
                ? "Log in to your accout"
                : "Create an account"}
            </div>
          </div>
          <div className={styles["form__element"]}>
            <p
              className={`${styles["form__error"]} ${
                userNameTouched &&
                userNameError &&
                styles["form__error__visible"]
              }`}
            >
              {userNameError}
            </p>
            <input
              type="userName"
              id="userName"
              name="userName"
              value={userName}
              placeholder="Name"
              required
              onChange={userNameChangeHandler}
              onBlur={emailBlurHandler}
            />
            <label htmlFor="userName"></label>
          </div>
          <div className={styles["form__element"]}>
            <p
              className={`${styles["form__error"]} ${
                emailTouched && emailError && styles["form__error__visible"]
              }`}
            >
              {emailError}
            </p>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              required
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <label htmlFor="email"></label>
          </div>
          <div className={styles["form__element"]}>
            <p
              className={`${styles["form__error"]} ${
                passTouched && passError && styles["form__error__visible"]
              }`}
            >
              {passError}
            </p>

            <div className={styles["form__password__wrapper"]}>
              <input
                type={showPass ? "text" : "password"}
                id="pass"
                name="pass"
                value={pass}
                required
                placeholder="Password"
                onChange={passChangeHandler}
                onBlur={emailBlurHandler}
              />
              <label htmlFor="pass"></label>

              <EyeSlash
                onClick={eyeClickHandler}
                style={{ display: showPass ? "none" : "block" }}
                className={styles["form__eye-slash"]}
              />
              <Eye
                onClick={eyeClickHandler}
                style={{ display: showPass ? "block" : "none" }}
                className={styles["form__eye"]}
              />
            </div>
          </div>

          <button
            disabled={!formValid}
            className={`${styles["form__element"]} ${styles["form__btn"]}`}
            onClick={() => {
              handleClick(pass, userName, email);
            }}
          >
            {current}
          </button>
          <div className={styles["form__links"]}>
            {current === "Sign In"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className={styles["form__link"]}
              to={current === "Sign In" ? "/auth/sign-up" : "/auth/sign-in"}
            >
              {current === "Sign In" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </div>
      <div className={styles["form__left"]}>
        <img
          className={styles["form__img"]}
          src="https://picsum.photos/700/750"
          alt="event"
        />
        <img className={styles["form__img__logo"]} src={logo} alt="logo" />
        <div className={styles["form__img__text"]}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            blanditiis sit quia voluptas, officia quidem!
          </p>
          <div>
            <h4 className="subtitle">Lorem, ipsum.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
