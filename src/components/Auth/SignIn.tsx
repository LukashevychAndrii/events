import React from "react";
import Form from "./Form";
import { useAppDispatch } from "../../utils/redux";
import { userSignIn } from "../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (password: string, userName: string, email: string) => {
    dispatch(
      userSignIn({
        email: email,
        password: password,
        userName: userName,
        navigate: navigate,
      })
    );
  };
  return <Form current="Sign In" handleClick={handleClick} />;
};

export default SignIn;
