import React from "react";
import { motion } from "framer-motion";
const Card = ({ children, classname, ...props }) => {
  return (
    <motion.div className={classname} {...props}>
      {children}
    </motion.div>
  );
};

export default Card;
