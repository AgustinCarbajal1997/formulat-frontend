import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCards = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(item.link)} className="dashboard-card">
      {item.icon}
      <h2>{item.title}</h2>
    </div>
  );
};

export default DashboardCards;
