import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/form/FormContainer";
import BASE_URL from "../../utils/constants/base_url";
import DATA_INPUTS from "../../components/dashboard/driverTeams/DataInputs";
import INITIAL_FORM_STATE from "../../components/dashboard/driverTeams/InitialFormState";
import REGULAR_EXPRESSION from "../../utils/constants/regex_edit_driverTeams";
import Textarea from "../../components/dashboard/Textarea";
import fetchingData from "../../utils/functions/fetchingData";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const DriverTeamsCreate = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  const inputFile = useRef();
  const { info } = useParams();
  const [bodyDescription, setBodyDescription] = useState("");
  const navigate = useNavigate();
  const onSubmitData = async (state) => {
    const dataUser = Object.keys(state).reduce(
      (obj, item) => ({ ...obj, [item]: state[item].value }),
      {}
    );
    const formData = new FormData();
    for (const key in dataUser) {
      formData.append(key, dataUser[key]);
    }
    if (!inputFile.current.files[0]) {
      toast.error("¡Introduzca una imagen!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      return;
    }
    formData.append("descriptionMarkdown", bodyDescription);
    formData.append("image", inputFile.current.files[0], "image.webp");
    try {
      await fetchingData(`${BASE_URL}/api/formula1/postData/${info}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        method: "post",
        body: formData,
      });
      toast.success("¡Creado existosamente!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      navigate(`/dashboard/informacion/${info}`);
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
      toast.error("Complete correctamente todos los campos", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    }
  };

  const onBodyDescriptionChange = (e) => {
    setBodyDescription(e.target.value);
  };
  return (
    <>
      <div>
        {info in DATA_INPUTS && info in INITIAL_FORM_STATE && (
          <FormContainer
            initialState={INITIAL_FORM_STATE[info]}
            dataInputs={DATA_INPUTS[info]}
            regexValidation={REGULAR_EXPRESSION[info]}
            onSignUpHandle={onSubmitData}
            title={""}
            classname={"newsadmin"}
            submitMessagge={"Crear"}
          >
            <Textarea
              placeholder="Cuerpo para describir. ¡Usar markdown!"
              className="textarea-newsadmin"
              onChange={onBodyDescriptionChange}
              value={bodyDescription}
            />
            <div>
              <label>Cargar una imagen (webp, jpg, jpeg)</label>
              <input
                ref={inputFile}
                type="file"
                name="image"
                accept="image/webp"
                required={true}
              />
            </div>
          </FormContainer>
        )}
      </div>
      <div style={{ position: "fixed", zIndex: "999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default DriverTeamsCreate;
