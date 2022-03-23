import React from "react";

const Confirm = ({ question, isActive, onConfirm, setIsActiveConfirm }) => {
  return (
    <div
      className="confirm-alert-container"
      style={{ display: isActive ? "block" : "none" }}
    >
      <div className="confirm-alert">
        <h2>{question}</h2>
        <div className="buttons-confirm">
          <button className="button-cancel" onClick={setIsActiveConfirm}>
            Cancelar
          </button>
          <button className="button-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
