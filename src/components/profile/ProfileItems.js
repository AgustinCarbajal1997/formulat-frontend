import React from "react";
import { BsBookmarks } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";

const PROFILE_ITEMS = [
  {
    icon: <BsBookmarks color="#ffffff" size={40} />,
    link: "/perfil/favoritos",
    title: "Favoritos",
  },
  {
    icon: <RiUserSettingsLine color="#ffffff" size={40} />,
    link: "/perfil/cambiar-clave",
    title: "Cambiar clave",
  },
];

export default PROFILE_ITEMS;
