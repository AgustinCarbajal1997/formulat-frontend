import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";

const LatestContainer = ({ data, classname, title, subtitle="Últimas noticias" }) => {
  const navigate = useNavigate();
  return (
    <div className={`${classname}-news-section`}>
      <h2>{title}</h2>
      <div className={`${classname}-news-container`}>
        {data.map((item, idx) => (
          <Card
            key={idx}
            classname={`${classname}-news-item-card`}
            style={{ opacity:0 }}
            onClick={() => navigate(`/noticia/${item.slug}`)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            
          >
            <div className={`${classname}-item-card-image`}>
              <img src={item.image} alt={item.id} />
            </div>
            <div className={`${classname}-item-card-info`}>
              <h4>{subtitle}</h4>
              <h4>{item.createdAt.substring(0, 10)}</h4>
            </div>
            <h3 className={`${classname}-item-card-title`}>{item.title}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LatestContainer;
