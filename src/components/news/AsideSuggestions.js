import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";

const AsideSuggestions = ({ data }) => {
  const navigate = useNavigate();
  const onNavigate = async(slug) => {
    navigate(`/noticia/${slug}`);
  };
  return (
    <div className="aside-suggestions-container">
      <h2 className="aside-suggestions-container-title">Noticias recientes</h2>
      {data.map((item, idx) => {
        return (
          <Card
            key={idx}
            classname="aside-suggestions-card"
            onClick={() => onNavigate(item.slug)}
          >
            <div className="aside-suggestions-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="aside-suggestions-data">
              <h4>{item.title.length<=60 ? item.title : item.title.substring(0, 60)+"..." }</h4>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AsideSuggestions;
