import React from "react";
import DashboardCards from "../../components/dashboard/DashboardCards";
import PROFILE_ITEMS from "../../components/profile/ProfileItems";
import { FiUserX } from "react-icons/fi";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const Profile = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const onCloseSessionHandle = () => {
      cookies.remove("tk", { path:"/" });
      dispatch(cleanState());
      navigate("/");
  }
  return (
    <div className="dashboard-container">
      {PROFILE_ITEMS.map((item, idx) => (
        <DashboardCards item={item} key={idx} />
      ))}
      <div className="dashboard-card" onClick={onCloseSessionHandle}>
        <FiUserX color="#ffffff" size={40} style={{ cursor: "pointer" }} />
        <h2>Cerrar sesión</h2>
      </div>
    </div>
  );
};

export default Profile;
