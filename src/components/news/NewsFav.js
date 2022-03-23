import React, { useState, useLayoutEffect } from "react";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { cleanState, updateDataUser } from "../../store/actions/user.actions";
import BASE_URL from "../../utils/constants/base_url";
import fetchingData from "../../utils/functions/fetchingData";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const NewsFav = ({ user, articleId }) => {
  const [isFav, setIsFav] = useState(false);
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const findFav = user.favorites.find((id) => id === articleId);
    if (!findFav) return setIsFav(false);
    return setIsFav(true);
  }, [user, articleId]);

  const saveFav = async () => {
    try {
      const data = await fetchingData(`${BASE_URL}/api/user/setFavorites`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "post",
        body: JSON.stringify({ articleId }),
      });

      dispatch(updateDataUser(data.data));
    } catch (error) {
      if (error.status === 401) {
        toast.error("Sesión expirada", {
          style: {
            backgroundColor: "#383838",
            color: "#ffffff",
          },
        });
        cookies.remove("tk", { path:"/" });
        dispatch(cleanState());
        return;
      }
      toast.error(error.message, {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    }
  };
  return (
    <>
      <div className="detail-item-mark">
        {!isFav ? (
          <BsBookmarks
            size={26}
            color={"#ffffff"}
            style={{ cursor: "pointer" }}
            onClick={saveFav}
          />
        ) : (
          <BsBookmarksFill
            size={26}
            color={"#f72222"}
            style={{ cursor: "pointer" }}
            onClick={saveFav}
          />
        )}
      </div>
      <div style={{ position: "fixed", zIndex: "999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default NewsFav;
