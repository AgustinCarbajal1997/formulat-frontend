import React from "react";
import NavBarList from "../components/navBar/NavBarList";
import NAV_BAR_OPTIONS from "../components/navBar/NavBarOptions";
import { MdOutlineLocalCafe } from "react-icons/md";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { ImTwitch } from "react-icons/im";
import ReactTooltip from 'react-tooltip';
const Footer = () => {
  return (
    <div className="footer">
      <nav className="nav-bar">
        <NavBarList options={NAV_BAR_OPTIONS} />
      </nav>
      <div className="social-media-aside-footer">
      
      <a
        className="social-media-aside-icon"
        href="https://cafecito.app/formulatoledo"
        rel="noreferrer"
        target={"_blank"}
        data-tip="Cafecito"
      >
        <MdOutlineLocalCafe size={24} color="#ffffff" />
      </a>

      <a
        className="social-media-aside-icon"
        href="https://www.instagram.com/formulatoledo/?hl=es"
        rel="noreferrer"
        target={"_blank"}
        data-tip="Instagram"
      >
        <BsInstagram size={24} color="#ffffff" />
      </a>
      <a
        className="social-media-aside-icon"
        href="https://www.youtube.com/channel/UCoRkvad9BhYCed7c-aEE4mQ"
        rel="noreferrer"
        target={"_blank"}
        data-tip="Youtube"
      >
        <BsYoutube size={24} color="#ffffff" />
      </a>
      <a
        className="social-media-aside-icon"
        href="https://www.twitch.tv/formulatoledo"
        rel="noreferrer"
        target={"_blank"}
        data-tip="Twitch"
      >
        <ImTwitch size={24} color="#ffffff" />
      </a>
      <ReactTooltip />
    </div>
      <h5>Software desarrollado por Agustín Carbajal</h5>
      <h5>+54 3875411213</h5>
    </div>
  );
};

export default Footer;
