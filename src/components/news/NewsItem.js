import React from "react";
import Card from "../card/Card";
import { Link, useNavigate } from "react-router-dom";
import NewsFav from "./NewsFav";
import NewsLike from "./NewsLike";
import { IoThumbsUpOutline, IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
const NewsItem = ({
  data,
  comments,
  dataComments,
  newComment,
  onCommentHandle,
  user,
  onSubmitCommentHandle,
  onCommentLikeHandle,
  setData,
  totalDocs,
  onShowMoreComments,
  onDeleteCommentByAdmin,
  onDeleteCommentByUser
}) => {
  const navigate = useNavigate();
  return (
    <div className="article-item-container">
      <h2 className="article-item-container-title">{data.title}</h2>
      <div className="article-item-container-image">
        <img src={data.image} alt={data.title} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5
          className="article-item-container-date"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {data.createdAt.substring(0, 10)}
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {" "}
            <IoEyeOutline size={30} color={"#ffffff"} /> {data.visits}
          </span>
        </h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {!user && (
              <>
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "1.5rem",
                    cursor: "pointer ",
                  }}
                >
                  {data.likes.length}
                </h2>
                <IoThumbsUpOutline
                  size={30}
                  color={"#ffffff"}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/iniciar-sesion")}
                />
              </>
            )}
            {user && <NewsLike user={user} article={data} setData={setData} />}
          </div>
          <div>{user && <NewsFav user={user} articleId={data.id} />}</div>
        </div>
      </div>
      <h3 className="article-item-container-description">{data.description}</h3>
      <div
        className="article-item-container-description-markdown"
        dangerouslySetInnerHTML={{
          __html: data.sanitizedHtml,
        }}
      ></div>
      <div className="comments-section">
        <h2 className="comments-section-title">{totalDocs} Comentarios</h2>
        <div className="comments-section-create-new-comment">
          {!user && (
            <h2>
              Para agregar comentarios por favor{" "}
              <Link to={"/iniciar-sesion"}>Iniciar sesión</Link> o{" "}
              <Link to={"/registrarse"}>Registrarse</Link>
            </h2>
          )}
          {user && (
            <>
              <input
                name="comment"
                type="text"
                placeholder="Agregar nuevo comentario..."
                value={newComment}
                onChange={onCommentHandle}
              />
              <div>
                <button onClick={onSubmitCommentHandle}>COMENTAR</button>
              </div>
            </>
          )}
        </div>
        {comments.length > 0 &&
          comments.map((item, idx) => (
            <Card classname="comment-card" key={idx}>
              <div className="comment-card-info">
                <h4>
                  {item.author.name} {item.author.lastname}
                </h4>
                <h4>{item.createdAt.substring(0, 10)}</h4>
              </div>
              <h3 className="comment-card-data">{item.comment}</h3>
              <div
                className="comment-card-buttons"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="comment-card-button-likes">
                  <span onClick={() => onCommentLikeHandle(item.id)}>👍</span>
                  <h4>{item.likes.length}</h4>
                </div>
                {user && user.permits === "admin" && (
                  <div>
                    <AiFillDelete
                      color="red"
                      size={22}
                      style={{ cursor: "pointer" }}
                      onClick={()=>onDeleteCommentByAdmin(item.id)}
                    />
                  </div>
                )}
                {user && user.permits === "user" && user.id === item.author.id && (
                  <div>
                    <AiFillDelete
                      color="red"
                      size={22}
                      style={{ cursor: "pointer" }}
                      onClick={()=>onDeleteCommentByUser(item.id)}
                    />
                  </div>
                )}
              </div>
              <hr />
            </Card>
          ))}
        {dataComments?.data?.hasNextPage && (
          <div className="comments-new-item">
            <h4 onClick={onShowMoreComments}>Ver más comentarios</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsItem;
