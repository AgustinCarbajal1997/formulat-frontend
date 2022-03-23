import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HighlightItem from "./HighlightItem";

const HighlightContainer = ({ data }) => {
  const [currentNews, setCurrentNews] = useState(data[0]);
  const [intervalCard, setIntervalCard] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const timerCards = setInterval(() => {
      if (intervalCard < data.length - 1) {
        setCurrentNews(data[intervalCard + 1]);
        setIntervalCard(intervalCard + 1);
      } else {
        setCurrentNews(data[0]);
        setIntervalCard(0);
      }
    }, 8000);

    return () => {
      clearInterval(timerCards);
    };
  }, [data, intervalCard]);

  return (
    <>
      <HighlightItem
        currentNews={currentNews}
        setCurrentNews={setCurrentNews}
        data={data}
        navigate={() => navigate(`/noticia/${currentNews.slug}`)}
        setIntervalCard={setIntervalCard}
      />
    </>
  );
};

export default HighlightContainer;
