import React, { useEffect, useLayoutEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Routes, Route } from "react-router-dom";
import NavBarContainer from "../components/navBar/NavBarContainer";
import Alert from "../components/alert/Alert";
import { Home, Login, SignUp } from "../pages";
import { useDispatch } from "react-redux";
import { continueSession } from "../store/actions/user.actions";
import Dashboard from "../pages/dashboard/Dashboard";
import NewsAdmin from "../pages/dashboard/NewsAdmin";
import NewsAdminEdit from "../pages/dashboard/NewsAdminEdit";
import NewsAdminCreate from "../pages/dashboard/NewsAdminCreate";
import DriverTeams from "../pages/dashboard/DriverTeams";
import DriverTeamsCreate from "../pages/dashboard/DriverTeamsCreate";
import DriverTeamsEdit from "../pages/dashboard/DriverTeamsEdit";
import News from "../pages/News";
import Information from "../pages/information/Information";
import InformationData from "../pages/information/InformationData";
import Statitics from "../pages/Statitics";
import AuthAdmin from "../components/auth/AuthAdmin";
import Profile from "../pages/profile/Profile";
import ProfileFavorites from "../pages/profile/ProfileFavorites";
import AuthUser from "../components/auth/AuthUser";
import Banner from "../components/banner/Banner";
import ChangePassword from "../pages/profile/ChangePassword";
import CreateAdmin from "../pages/dashboard/CreateAdmin";
import NotFound from "../pages/NotFound";
import Footer from "../pages/Footer";
const cookies = new Cookies();

const Navigator = () => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(true);
  useLayoutEffect(() => {
    if (cookies.get("tk")) {
      dispatch(continueSession(cookies.get("tk")));
      return;
    }
  }, [dispatch]);
  useEffect(() => {
    let timerBanner = setTimeout(() => setBanner(false), 6000);
    return () => {
      clearTimeout(timerBanner);
    };
  }, []);

  return (
    <>
      <NavBarContainer />
      <Alert />
      {banner && <Banner />}
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/noticia/:slug" element={<News />} />
          <Route
            path="/informacion/:type/:slug"
            element={<InformationData />}
          />
          <Route path="/informacion/:type" element={<Information />} />
          <Route path="/estadisticas" element={<Statitics />} />
          <Route path="/registrarse" element={<SignUp />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route element={<AuthUser />}>
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/favoritos" element={<ProfileFavorites />} />
            <Route path="/perfil/cambiar-clave" element={<ChangePassword />} />
          </Route>
          <Route element={<AuthAdmin />}>
            <Route
              path="/dashboard/noticias/editar/:slug"
              element={<NewsAdminEdit />}
            />
            <Route
              path="/dashboard/noticias/crear"
              element={<NewsAdminCreate />}
            />
            <Route path="/dashboard/noticias" element={<NewsAdmin />} />
            <Route
              path="/dashboard/informacion/:info/editar/:slug"
              element={<DriverTeamsEdit />}
            />
            <Route
              path="/dashboard/informacion/:info/crear"
              element={<DriverTeamsCreate />}
            />
            <Route
              path="/dashboard/informacion/:info"
              element={<DriverTeams />}
            />
            <Route
              path="/dashboard/crear-administrador"
              element={<CreateAdmin />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default Navigator;
