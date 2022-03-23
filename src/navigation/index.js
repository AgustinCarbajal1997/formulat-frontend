import React from "react";
import Navigator from "./Navigator";
import { BrowserRouter } from "react-router-dom";
const Router = () => {
  return (
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  );
};

export default Router;
