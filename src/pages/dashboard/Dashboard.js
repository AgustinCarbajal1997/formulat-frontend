import React from "react";
import DashboardCards from "../../components/dashboard/DashboardCards";
import DASHBOARD_ITEMS from "../../components/dashboard/DashboardItems";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {DASHBOARD_ITEMS.map((item, idx) => (
        <DashboardCards item={item} key={idx} />
      ))}
    </div>
  );
};

export default Dashboard;
