import React, { useState } from "react";
import NavBarList from "./NavBarList";
import NAV_BAR_OPTIONS from "./NavBarOptions";
import logo from "../../assets/images/logoheader.png";
import { Squash as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../button/Button";
import useWindowDimensions from "../../customHooks/useWindowsDimensions";
const NavBarContainer = () => {
  const user = useSelector((state) => state.user.dataUser);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  return (
    <header className="header-container">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="hamburger-container">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={32}
            color={isOpen ? "#ffffff" : "#ffffff"}
          />
        </div>
        <nav
          className="nav-bar-mobile"
          style={{ left: isOpen ? "0" : "-100%" }}
        >
          {NAV_BAR_OPTIONS.map((item, idx) => (
            <Link to={item.path} key={idx} onClick={() => setOpen(false)}>
              {item.option}
            </Link>
          ))}
          {user?.permits === "admin" && (
            <Link to={"/dashboard"} onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
          {user && (
            <Link to={"/perfil"} onClick={() => setOpen(false)}>
              Perfil
            </Link>
          )}
          {!user && (
            <>
              <Link to={"/iniciar-sesion"} onClick={() => setOpen(false)}>
                Iniciar sesión
              </Link>
              <Link to={"/registrarse"} onClick={() => setOpen(false)}>
                Registrarse
              </Link>
            </>
          )}
        </nav>
        {/* desktop */}
        {width > 768 && (
          <>
            <nav className="nav-bar">
              <NavBarList options={NAV_BAR_OPTIONS} />
            </nav>
            <div className="buttons-auth">
              {user && user.permits === "admin" && (
                <>
                  <Button
                    title={`Hola ${user.name}`}
                    className="buttons-auth-login"
                    onClick={() => navigate("/perfil")}
                  />
                  <Button
                    title={"Administrar"}
                    className="buttons-auth-signup"
                    onClick={() => navigate("/dashboard")}
                  />
                </>
              )}
              {user && user.permits === "user" && (
                <Button
                  title={`Hola ${user.name}`}
                  className="buttons-auth-login"
                  onClick={() => navigate("/perfil")}
                />
              )}

              {!user && (
                <>
                  <Button
                    title={"Iniciar sesión"}
                    className="buttons-auth-login"
                    onClick={() => navigate("/iniciar-sesion")}
                  />
                  <Button
                    title={"Registrarse"}
                    className="buttons-auth-signup"
                    onClick={() => navigate("/registrarse")}
                  />
                </>
              )}
            </div>
          </>
        )}
        {/* desktop */}
      </div>
    </header>
  );
};

export default NavBarContainer;
