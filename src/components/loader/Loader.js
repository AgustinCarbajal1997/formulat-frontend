import React from "react";
import { TailSpin } from  'react-loader-spinner'
const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
        <TailSpin ariaLabel="loading-indicator" color="#ffffff"/>
    </div>
  );
};

export default Loader;
