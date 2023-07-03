import React from "react";
import { useAppDispatch } from "../../utils/redux";
import { userCreate } from "../../store/slices/user-slice";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (password: string, userName: string, email: string) => {
    dispatch(
      userCreate({
        email: email,
        password: password,
        userName: userName,
        navigate: navigate,
      })
    );
  };
  return <Form current="Sign Up" handleClick={handleClick} />;
};

export default SignUp;
