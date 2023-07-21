import React from "react";
import AccDetails from "../components/AccDetails/AccDetails";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

const AccDetailsPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.isAuth) {
      navigate("/events/auth/sign-in");
    }
  }, [auth, navigate]);
  return <AccDetails />;
};

export default AccDetailsPage;
