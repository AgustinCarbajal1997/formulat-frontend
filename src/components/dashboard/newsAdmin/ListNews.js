import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import { BsCheckLg } from "react-icons/bs";
import Confirm from "../../confirm/confirm";
const ListNews = ({ item, onDeleteHandle, onSetHighlightHandle, width }) => {
  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  const navigate = useNavigate();
  const onDeletePopUpHandle = () => {
    onDeleteHandle(item.id);
    setIsActiveConfirm(false);
  };
  return (
    <tr>
      <td className={"titles-table-listnews"}>{item.title}</td>
      {width > 768 && (
        <>
          <td className="td-buttons">
            <h4>{item.createdAt.substring(0, 10)}</h4>
          </td>
          <td className="td-buttons">
            <div
              className="highlight-button-admin"
              onClick={() => onSetHighlightHandle(item.id)}
            >
              {item.highlight ? <BsCheckLg color="green" /> : ""}
            </div>
          </td>
        </>
      )}

      <td className="td-buttons">
        <Button
          title={"Editar"}
          className={"buttons-table-listnews-edit"}
          onClick={() => navigate(`/dashboard/noticias/editar/${item.slug}`)}
        />
      </td>
      <td className="td-buttons">
        <Button
          title={"Eliminar"}
          className={"buttons-table-listnews-delete"}
          onClick={() => setIsActiveConfirm(true)}
        />
        <Confirm
          question={"¿Desea realmente eliminar?"}
          isActive={isActiveConfirm}
          setIsActiveConfirm={() => setIsActiveConfirm(false)}
          onConfirm={() => onDeletePopUpHandle()}
        />
      </td>
    </tr>
  );
};

export default ListNews;
