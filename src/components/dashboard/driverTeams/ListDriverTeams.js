import React, { useState } from "react";
import Button from "../../button/Button";
import Confirm from "../../confirm/confirm";

const ListDriverTeams = ({ item, onDeleteHandle, onEditHandle, width }) => {
  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  const onDeletePopUpHandle = () => {
    onDeleteHandle(item.id);
    setIsActiveConfirm(false);
  };
  return (
    <tr>
      {width > 1024 && <td className={"titles-table-listnews"}>{item.id}</td>}

      <td className={"titles-table-listnews"}  style={{textAlign:"center"}}>{item.name}</td>
      {width > 1024 && (
        <>
          <td className={"titles-table-listnews"} style={{textAlign:"center"}}>{item.country}</td>
          <td className={"titles-table-listnews"} style={{textAlign:"center"}}>{item.wins}</td>
          <td className={"titles-table-listnews"} style={{textAlign:"center"}}>{item.championships}</td>
        </>
      )}
      <td className="td-buttons">
        <Button
          title={"Editar"}
          className={"buttons-table-listnews-edit"}
          onClick={() => onEditHandle(item.slug)}
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

export default ListDriverTeams;
