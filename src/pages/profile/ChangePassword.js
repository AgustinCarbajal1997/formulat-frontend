import React from "react";
import FormContainer from "../../components/form/FormContainer";
import DATA_INPUTS from "../../components/profile/DataInputsChangePass";
import { useSelector, useDispatch } from "react-redux";
import INITIAL_FORM_STATE from "../../components/profile/InitialFormStateChangePass";
import BASE_URL from "../../utils/constants/base_url";
import { ToastContainer, toast } from "react-toastify";
import REGULAR_EXPRESSION from "../../utils/constants/regex_change_pass";
import fetchingData from "../../utils/functions/fetchingData";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const ChangePassword = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePass = async (state) => {
    const dataUser = Object.keys(state).reduce(
      (obj, item) => ({ ...obj, [item]: state[item].value }),
      {}
    );
    try {
      await fetchingData(`${BASE_URL}/api/user/changePassword`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "put",
        body: JSON.stringify(dataUser),
      });
      toast.success("¡Actualizado correctamente!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      navigate("/perfil");
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
      toast.error("No se pudo actualizar contraseña. Vuelva a intentar.", {
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
          onSignUpHandle={onChangePass}
          title={"Cambiar contraseña"}
          classname={"signup"}
          submitMessagge={"Confirmar"}
        />
      </div>
      <div style={{ position: "fixed", zIndex: "99999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default ChangePassword;
