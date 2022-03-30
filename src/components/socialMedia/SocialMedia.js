import React from "react";
import { MdOutlineLocalCafe } from "react-icons/md";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { ImTwitch } from "react-icons/im";
import { motion } from "framer-motion";
import ReactTooltip from 'react-tooltip';
const SocialMedia = () => {
  return (
    <div className="social-media-aside-container">
      
      <motion.a
        className="social-media-aside-icon"
        href="https://cafecito.app/formulatoledo"
        rel="noreferrer"
        target={"_blank"}
        animate={{ borderColor:["#d00098", "#8548e6", "#d00098"] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ borderRadius:"5px", border:"1px solid", padding:"5px" }}
        data-tip="Cafecito"
      >
        <MdOutlineLocalCafe size={24} color="#ffffff" />
      </motion.a>

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
  );
};

export default SocialMedia;
