import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BASE_URL from "../../utils/constants/base_url";
import fetchingData from "../../utils/functions/fetchingData";
import NewsItem from "./NewsItem";
import { ToastContainer, toast } from "react-toastify";
import usePagination from "../../customHooks/usePagination";
import AsideSuggestions from "./AsideSuggestions";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const NewsContainer = ({ data, setData, dataAside }) => {
  const user = useSelector((state) => state.user.dataUser);
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const {
    data: dataComments,
    savePrev,
    setSavePrev,
    onNextPage,
    totalDocs,
    setTotalDocs,
    redirect,
  } = usePagination(`${BASE_URL}/api/blog/getComments?`, 1, 3, true, true, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ ids: data.comments }),
  });

  useEffect(() => {
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onDeleteCommentByAdmin = async (commentId) => {
    try {
      await fetchingData(`${BASE_URL}/api/blog/deleteCommentbyAdmin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "put",
        body: JSON.stringify({ commentId, articleId:data.id }),
      });
      toast.success("¡Eliminado correctamente!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      const copyArr = [...savePrev];
      const filterComment = copyArr.filter(item => item.id !== commentId);
      setSavePrev(filterComment);
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

  const onDeleteCommentByUser = async (commentId) => {
    try {
      await fetchingData(`${BASE_URL}/api/blog/deleteCommentbyUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "put",
        body: JSON.stringify({ commentId, articleId:data.id }),
      });
      toast.success("¡Eliminado correctamente!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      const copyArr = [...savePrev];
      const filterComment = copyArr.filter(item => item.id !== commentId);
      setSavePrev(filterComment);
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

  const onCommentHandle = (e) => {
    if (e.target.value.length > 250) return;
    setNewComment(e.target.value);
  };
  const onCommentLikeHandle = async (commentId) => {
    if (!user || !access_token) {
      toast.error("¡Por favor registrarse!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      return;
    }
    try {
      const dataComment = await fetchingData(
        `${BASE_URL}/api/blog/postLikeComment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          method: "post",
          body: JSON.stringify({ commentId }),
        }
      );
      const copyArr = [...savePrev];
      const updateLikes = copyArr.findIndex(
        (item) => item.id === dataComment.data.id
      );
      copyArr[updateLikes] = dataComment.data;
      setSavePrev(copyArr);
    } catch (error) {
      toast.error("¡Ha ocurrido un error!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    }
  };
  const onSubmitCommentHandle = async () => {
    try {
      const newCommentData = await fetchingData(
        `${BASE_URL}/api/blog/postComment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          method: "post",
          body: JSON.stringify({
            comment: newComment,
            articleId: data.id,
          }),
        }
      );
      setNewComment("");
      setSavePrev([newCommentData.data, ...savePrev]);
      setTotalDocs(totalDocs + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NewsItem
        data={data}
        comments={savePrev}
        dataComments={dataComments}
        totalDocs={totalDocs}
        newComment={newComment}
        onCommentHandle={onCommentHandle}
        user={user}
        onSubmitCommentHandle={onSubmitCommentHandle}
        onCommentLikeHandle={onCommentLikeHandle}
        setData={setData}
        onShowMoreComments={onNextPage}
        redirect={redirect}
        onDeleteCommentByAdmin={onDeleteCommentByAdmin}
        onDeleteCommentByUser={onDeleteCommentByUser}
      />
      <AsideSuggestions data={dataAside} redirect={redirect} />
      <div style={{ position: "fixed", zIndex: "99999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default NewsContainer;
