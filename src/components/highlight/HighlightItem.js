import React from "react";
import Card from "../card/Card";
import { motion } from "framer-motion";
const HighlightItem = ({
  currentNews,
  setCurrentNews,
  data,
  navigate,
  setIntervalCard,
}) => {
  const onClickCard = (item, idx) => {
    setCurrentNews(item);
    setIntervalCard(idx);
  };
  return (
    <div className="highlight-item-container">
      <motion.div
        initial={{ filter: "brightness(0)" }}
        animate={{ filter: "brightness(1)" }}
        transition={{ duration: 0.8 }}
        className="highlight-item-banner"
        key={currentNews.title}
        style={{
          backgroundImage: `linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ), url(${currentNews.image})`,
        }}
      >
        <div className="highlight-item-block">
          <motion.h4
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            DESTACADAS
          </motion.h4>
          <motion.h2
            style={{ opacity: 0 }}
            animate={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {currentNews.title}
          </motion.h2>
          <motion.button
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={navigate}
          >
            VER MÁS
          </motion.button>
        </div>
      </motion.div>
      <div className="highlight-item-banner-cards-container">
        <div className="highlight-item-banner-cards">
          {data.map((item, idx) => (
            <Card
              classname="highlight-item-banner-card"
              key={idx}
              onClick={() => onClickCard(item, idx)}
            >
              <>
                {currentNews.id === item.id && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8 }}
                    className="pogress-bar"
                  ></motion.div>
                )}

                <div>
                  <h4
                    style={{
                      color: currentNews.id !== item.id ? "#939393" : "#ffffff",
                    }}
                  >
                    Destacadas
                  </h4>
                  <h4
                    style={{
                      color: currentNews.id !== item.id ? "#939393" : "#ffffff",
                    }}
                  >
                    {item.createdAt.substring(0, 10)}
                  </h4>
                </div>
                <h3
                  style={{
                    color: currentNews.id !== item.id ? "#939393" : "#ffffff",
                  }}
                >
                  {item.title}
                </h3>
              </>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightItem;
