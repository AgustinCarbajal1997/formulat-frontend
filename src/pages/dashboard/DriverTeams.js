import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import BASE_URL from "../../utils/constants/base_url";
import { IoCreateOutline } from "react-icons/io5";
import fetchingData from "../../utils/functions/fetchingData";
import ListDriverTeams from "../../components/dashboard/driverTeams/ListDriverTeams";
import useWindowDimensions from "../../customHooks/useWindowsDimensions";
import usePagination from "../../customHooks/usePagination";
import Pagination from "../../components/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const DriverTeams = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const { info } = useParams();
  const dispatch = useDispatch();
  const { data, setData, page, onPrevPage, onNextPage } = usePagination(
    `${BASE_URL}/api/formula1/getData/${info}?`,
    1,
    5,
    true
  );
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const onDeleteHandle = async (id) => {
    try {
      await fetchingData(`${BASE_URL}/api/formula1/deleteData/${info}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "delete",
      });
      const newData = await fetchingData(
        `${BASE_URL}/api/formula1/getData/${info}?page=${page}&limit=5&pagination=true`
      );
      toast.success("¡Eliminado correctamente!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      setData(newData);
    } catch (error) {
      if (error.status === 401) {
        toast.error("¡Sesión expirada!", {
          style: {
            backgroundColor: "#383838",
            color: "#ffffff",
          },
        });
        cookies.remove("tk", { path:"/" });
        dispatch(cleanState());
        return;
      }
      toast.error("Ocurrió un error. Intente nuevamente.", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    }
  };
  const onEditHandle = async (slug) => {
    navigate(`/dashboard/informacion/${info}/editar/${slug}`);
  };

  return (
    <>
      <div className="newslist-container">
        <div className="newslist-button-create-div">
          <Button
            title={"Crear nuevo"}
            className={"newslist-button-create"}
            onClick={() => navigate(`/dashboard/informacion/${info}/crear`)}
          >
            <IoCreateOutline color="#ffffff" size={32} />
          </Button>
        </div>
        {data?.data?.docs?.length && (
          <table className="table-newslist">
            <thead>
              <tr>
                {width > 1024 && <th className="header-title-table">ID</th>}

                <th className="header-title-table">{info.toUpperCase()}</th>
                {width > 1024 && (
                  <>
                    <th className="header-title-table">PAÍS</th>
                    <th className="header-title-table">VICTORIAS</th>
                    <th className="header-title-table">CAMPEONATOS</th>
                  </>
                )}
                <th className="header-title-table">EDITAR</th>
                <th className="header-title-table">ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {data.data.docs.map((item, idx) => (
                <ListDriverTeams
                  item={item}
                  key={idx}
                  onEditHandle={onEditHandle}
                  onDeleteHandle={onDeleteHandle}
                  width={width}
                />
              ))}
            </tbody>
          </table>
        )}
        {data?.data?.docs?.length && (
          <Pagination
            page={page}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            totalPages={data.data.totalPages}
          />
        )}
      </div>
      <div style={{ position: "fixed", zIndex: "999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default DriverTeams;
