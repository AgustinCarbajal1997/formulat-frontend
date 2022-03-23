import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthUser = () => {
  const user = useSelector((state) => state.user.dataUser);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={"/iniciar-sesion"} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
};

export default AuthUser;
