import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DATA_INPUTS from "../components/login/DataInputs";
import FormContainer from "../components/form/FormContainer";
import INITIAL_FORM_STATE from "../components/login/InitialFormState";
import { login } from "../store/actions/user.actions";
import REGULAR_EXPRESSION from "../utils/constants/regex_login";
import LOGO from "../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.dataUser);

  useEffect(() => {
    if (user) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }
  }, [user, navigate, location]);

  const onSignUpHandle = (state) => {
    const dataUser = Object.keys(state).reduce(
      (obj, item) => ({ ...obj, [item]: state[item].value }),
      {}
    );
    dispatch(login(dataUser));
  };

  return (
    <div className="login-container">
      <div className="login-container-logo">
        <img src={LOGO} alt="logo" />
      </div>
      <FormContainer
        initialState={INITIAL_FORM_STATE}
        dataInputs={DATA_INPUTS}
        regexValidation={REGULAR_EXPRESSION}
        onSignUpHandle={onSignUpHandle}
        title={"Datos del usuario"}
        classname={"login"}
        submitMessagge={"Iniciar sesión"}
      />
    </div>
  );
};

export default Login;
