import React from "react";

const Button = (props) => {
  return (
    <button {...props}>
      {props.title} {props.children}{" "}
    </button>
  );
};

export default Button;
