import React from "react";
import NavBarList from "../components/navBar/NavBarList";
import NAV_BAR_OPTIONS from "../components/navBar/NavBarOptions";

const Footer = () => {
  return (
    <div className="footer">
      <nav className="nav-bar">
        <NavBarList options={NAV_BAR_OPTIONS} />
      </nav>
      <h5>Desarrollado por Agustín Carbajal</h5>
      <h5>+54 3875411213</h5>
    </div>
  );
};

export default Footer;
