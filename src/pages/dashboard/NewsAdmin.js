import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import ListNews from "../../components/dashboard/newsAdmin/ListNews";
import BASE_URL from "../../utils/constants/base_url";
import { IoCreateOutline } from "react-icons/io5";
import fetchingData from "../../utils/functions/fetchingData";
import useWindowDimensions from "../../customHooks/useWindowsDimensions";
import usePagination from "../../customHooks/usePagination";
import Pagination from "../../components/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const NewsAdmin = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  const { data, setData, page, onPrevPage, onNextPage } = usePagination(
    `${BASE_URL}/api/blog/getAllNews?`,
    1,
    5,
    true
  );
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const onSetHighlightHandle = async (articleId) => {
    try {
      const newData = await fetchingData(
        `${BASE_URL}/api/blog/setHighlights/${articleId}?page=${page}&limit=5&pagination=true`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setData(newData);
    } catch (error) {
      if (error.status === 401) {
        toast.error("¡Sesión expirada!", {
          style: {
            backgroundColor: "#383838",
            color: "#ffffff",
          },
        });
        cookies.remove("tk", { path: "/" });
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

  const onDeleteHandle = async (id) => {
    try {
      await fetchingData(`${BASE_URL}/api/blog/deleteNews/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "delete",
      });
      const newData = await fetchingData(
        `${BASE_URL}/api/blog/getAllNews?page=1&limit=5&pagination=true`
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
        cookies.remove("tk", { path: "/" });
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

  return (
    <>
      <div className="newslist-container">
        <div className="newslist-button-create-div">
          <Button
            title={"Crear noticia"}
            className={"newslist-button-create"}
            onClick={() => navigate(`/dashboard/noticias/crear`)}
          >
            <IoCreateOutline color="#ffffff" size={32} />
          </Button>
        </div>
        {data?.data?.docs?.length && (
          <table className="table-newslist">
            <thead>
              <tr>
                <th className="header-title-table">Noticia</th>
                {width > 768 && (
                  <>
                    <th className="header-title-table">Fecha</th>
                    <th className="header-title-table">Destacada</th>
                  </>
                )}

                <th className="header-title-table">Editar</th>
                <th className="header-title-table">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.data.docs.map((item, idx) => (
                <ListNews
                  item={item}
                  key={idx}
                  onDeleteHandle={onDeleteHandle}
                  onSetHighlightHandle={onSetHighlightHandle}
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

export default NewsAdmin;
