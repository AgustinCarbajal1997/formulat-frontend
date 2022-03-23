import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/404.webp";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ width: "100%", height: "100vh", cursor: "pointer" }}
      onClick={() => navigate("/")}
    >
      <img
        src={image}
        alt="404"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default NotFound;
