import React, { useReducer } from "react";
import FormList from "./FormList";
import { formReducer } from "./FormReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FormContainer = ({
  initialState,
  dataInputs,
  regexValidation,
  onSignUpHandle,
  classname,
  submitMessagge,
  title,
  children
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const onChangeInputHandler = (e) => {
    const data = e.target.value;
    const regex = regexValidation[e.target.name].test(data);
    const modification = {
      item: e.target.name,
      value: data,
      onBlur: false,
      checked: regex,
    };
    dispatch({ type: "MODIFY_INPUT", payload: modification });
  };
  const onBlurRegex = (e) => {
    dispatch({ type: "BLUR_REGEX", payload: e.target.name });
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const checkedInputs = Object.values(state)
      .map((item) => item.checked)
      .every((item) => item === true);
    if (!checkedInputs) {
      toast.error("¡No ha completado correctamente los campos!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      dispatch({ type: "TOTAL_BLUR_REGEX" });
      return;
    }
    onSignUpHandle(state);
  };

  return (
    <>
      <FormList
        state={state}
        items={dataInputs}
        onChangeInputHandler={onChangeInputHandler}
        onBlurRegex={onBlurRegex}
        onSubmitHandle={onSubmitHandle}
        classname={classname}
        submitMessagge={submitMessagge}
        title={title}
        children={children}
      />
      <div style={{ position: "fixed" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default FormContainer;