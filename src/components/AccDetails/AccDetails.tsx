import React from "react";
import { useAppDispatch } from "../../utils/redux";
import { userSignOut } from "../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";

const AccDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOutCLick = () => {
    dispatch(userSignOut({ navigate: navigate }));
  };
  return <button onClick={handleSignOutCLick}>Sign out</button>;
};

export default AccDetails;
