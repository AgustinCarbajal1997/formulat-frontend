import React from "react";
import { Link } from "react-router-dom";

const NavBarList = ({ options }) => {
  return (
    <>
      {options.map((item, idx) => (
        <Link to={item.path} key={idx} className="nav-bar-options">
          {item.option}
        </Link>
      ))}
    </>
  );
};

export default NavBarList;
