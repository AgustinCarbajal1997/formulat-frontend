import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DATA_INPUTS from "../components/signup/DataInputs";
import FormContainer from "../components/form/FormContainer";
import INITIAL_FORM_STATE from "../components/signup/InitialFormState";
import { signup } from "../store/actions/user.actions";
import REGULAR_EXPRESSION from "../utils/constants/regex_signup";
import LOGO from "../assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
const SignUp = () => {
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
    dispatch(signup(dataUser));
  };

  return (
    <div className="signup-container">
      <div className="signup-container-logo">
        <img src={LOGO} alt="logo" />
      </div>
      <FormContainer
        initialState={INITIAL_FORM_STATE}
        dataInputs={DATA_INPUTS}
        regexValidation={REGULAR_EXPRESSION}
        onSignUpHandle={onSignUpHandle}
        title={"Datos de registro"}
        classname={"signup"}
        submitMessagge={"Registrar"}
      />
    </div>
  );
};

export default SignUp;
