import React from "react";
import logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <motion.div
      className="banner"
      animate={{ opacity: [1, 0], display:"none" }}
      transition={{ default:{ duration:0.3, delay:5.5 }, display:{ delay:6 } }}
    >
      <motion.div
        className="banner-title"
        animate={{ opacity: [0, 1], display: ["none", "block"] }}
        transition={{ delay: 4.8, duration: 0.3 }}
      >
        <h2>¡Lights out and away we go!</h2>
      </motion.div>
      <motion.div
        className="lights-container"
        animate={{ opacity: 0, visibility: "hidden", display: "none" }}
        transition={{ delay: 4.5 }}
      >
        <motion.div
          className="logo-banner"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.1, delay: 0.8, type: "just" }}
        >
          <img src={logo} alt="logo-banner" />
        </motion.div>
        <div className="lights-items">
          <div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 0.8, type: "just" }}
              className="lights-item"
            ></motion.div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 0.8, type: "just" }}
              className="lights-item"
            ></motion.div>
          </div>
          <div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 1.6, type: "just" }}
              className="lights-item"
            ></motion.div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 1.6, type: "just" }}
              className="lights-item"
            ></motion.div>
          </div>
          <div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 2.4, type: "just" }}
              className="lights-item"
            ></motion.div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 2.4, type: "just" }}
              className="lights-item"
            ></motion.div>
          </div>
          <div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 3.2, type: "just" }}
              className="lights-item"
            ></motion.div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 3.2, type: "just" }}
              className="lights-item"
            ></motion.div>
          </div>
          <div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 4, type: "just" }}
              className="lights-item"
            ></motion.div>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: 4, type: "just" }}
              className="lights-item"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
