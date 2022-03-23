import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
const DASHBOARD_ITEMS = [
  {
    icon: <IoNewspaperOutline color="#ffffff" size={40} />,
    link: "/dashboard/noticias",
    title: "Noticias",
  },
  {
    icon: <FaUserAstronaut color="#ffffff" size={40} />,
    link: "/dashboard/informacion/pilotos",
    title: "Pilotos",
  },
  {
    icon: <RiTeamLine color="#ffffff" size={40} />,
    link: "/dashboard/informacion/equipos",
    title: "Equipos",
  },
  {
    icon: <FiUserPlus color="#ffffff" size={40} />,
    link: "/dashboard/crear-administrador",
    title: "Crear admin",
  },
];

export default DASHBOARD_ITEMS;
