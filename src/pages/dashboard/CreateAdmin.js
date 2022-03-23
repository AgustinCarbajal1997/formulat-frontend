import React from "react";
import FormContainer from "../../components/form/FormContainer";
import DATA_INPUTS from "../../components/dashboard/createAdmin/DataInputsCreateAdmin";
import INITIAL_FORM_STATE from "../../components/dashboard/createAdmin/InitialStateCreateAdmin";
import REGULAR_EXPRESSION from "../../utils/constants/regex_create_admin";
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from "../../utils/constants/base_url";
import { useSelector, useDispatch } from "react-redux";
import { cleanState } from "../../store/actions/user.actions";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const CreateAdmin = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onCreateNewAdmin = async (state) => {
    const dataNewAdmin = Object.keys(state).reduce(
      (obj, item) => ({ ...obj, [item]: state[item].value }),
      {}
    );
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signUpAdmin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "post",
        body: JSON.stringify(dataNewAdmin),
      });
      const data = await response.json();
      if (!response.ok) {
        const err = {
          status: response.status,
          message: data.message || "Ha ocurrido un error",
        };
        throw err;
      }
      toast.success("¡Registro exitoso!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.status === 401) {
        toast.error("No autorizado", {
          style: {
            backgroundColor: "#383838",
            color: "#ffffff",
          },
        });
        cookies.remove("tk", { path:"/" });
        dispatch(cleanState());
        return;
      }
      if (error.status === 400) {
        toast.error("Mail existente o datos incorrectos", {
          style: {
            backgroundColor: "#383838",
            color: "#ffffff",
          },
        });
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
      <div style={{ marginTop: "18vh" }}>
        <FormContainer
          initialState={INITIAL_FORM_STATE}
          dataInputs={DATA_INPUTS}
          regexValidation={REGULAR_EXPRESSION}
          onSignUpHandle={onCreateNewAdmin}
          title={"Crear nuevo usuario"}
          classname={"signup"}
          submitMessagge={"Crear administrador"}
        />
      </div>
      <div style={{ position: "fixed", zIndex: "999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateAdmin;
