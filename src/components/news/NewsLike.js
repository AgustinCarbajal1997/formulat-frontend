import React, { useState, useLayoutEffect } from "react";
import { IoIosThumbsUp } from "react-icons/io";
import { IoThumbsUpOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../utils/constants/base_url";
import fetchingData from "../../utils/functions/fetchingData";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const NewsLike = ({ user, article, setData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!article.likes.length) return setIsLiked(false);
    const findLike = article.likes.find((id) => id === user.id);
    if (!findLike) return setIsLiked(false);
    return setIsLiked(true);
  }, [user, article]);

  const onLikeHandle = async () => {
    try {
      await fetchingData(`${BASE_URL}/api/blog/postLikeNews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "post",
        body: JSON.stringify({ articleId: article.id }),
      });
      const data = await fetchingData(
        `${BASE_URL}/api/blog/getNewsBySlug/${article.slug}`
      );
      setData(data);
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ color: "#ffffff", fontSize: "1.5rem" }}>
          {article.likes.length}
        </h3>
        <div className="detail-item-mark">
          {!isLiked ? (
            <IoThumbsUpOutline
              size={30}
              color={"#ffffff"}
              style={{ cursor: "pointer" }}
              onClick={onLikeHandle}
            />
          ) : (
            <IoIosThumbsUp
              size={30}
              color={"#f72222"}
              style={{ cursor: "pointer" }}
              onClick={onLikeHandle}
            />
          )}
        </div>
      </div>
      <div style={{ position: "fixed", zIndex: "999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default NewsLike;
