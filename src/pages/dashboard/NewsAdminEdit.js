import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/form/FormContainer";
import useFetch from "../../customHooks/useFetch";
import BASE_URL from "../../utils/constants/base_url";
import DATA_INPUTS from "../../components/dashboard/newsAdmin/DataInputs";
import REGULAR_EXPRESSION from "../../utils/constants/regex_edit_news";
import Textarea from "../../components/dashboard/Textarea";
import fetchingData from "../../utils/functions/fetchingData";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { cleanState } from "../../store/actions/user.actions";
const cookies = new Cookies();
const NewsAdminEdit = () => {
  const [dataForm, setDataForm] = useState(null);
  const [bodyDescription, setBodyDescription] = useState("");
  const access_token = useSelector((state) => state.user.access_token);
  const dispatch = useDispatch();
  const inputFile = useRef();
  const { slug } = useParams();
  const { data } = useFetch(`${BASE_URL}/api/blog/getNewsBySlug/${slug}`);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data || !data.data) return;
    const createState = Object.values(DATA_INPUTS).reduce((ac, item) => {
      const keyword = item.name;
      return {
        ...ac,
        [keyword]: {
          value: data.data[keyword],
          onBlur: false,
          checked: true,
        },
      };
    }, {});
    setDataForm(createState);
  }, [data]);

  const onSubmitData = async (dataForm) => {
    const dataUser = Object.keys(dataForm).reduce(
      (obj, item) => ({ ...obj, [item]: dataForm[item].value }),
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
    formData.append("markdown", bodyDescription);
    formData.append("image", inputFile.current.files[0], "image.webp");

    try {
      await fetchingData(`${BASE_URL}/api/blog/putNews/${data.data.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        method: "put",
        body: formData,
      });
      toast.success("¡Noticia actualizada!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
      navigate("/dashboard/noticias");
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

  useEffect(() => {
    if (!data || !data.data) return;
    setBodyDescription(data.data.markdown);
  }, [data]);

  const onBodyDescriptionChange = (e) => {
    setBodyDescription(e.target.value);
  };
  return (
    <>
      <div>
        {dataForm && (
          <FormContainer
            initialState={dataForm}
            dataInputs={DATA_INPUTS}
            regexValidation={REGULAR_EXPRESSION}
            onSignUpHandle={onSubmitData}
            title={"Datos del usuario"}
            classname={"newsadmin"}
            submitMessagge={"Editar"}
          >
            <Textarea
              placeholder="Cuerpo de tu noticia. ¡Usar markdown!"
              className="textarea-newsadmin"
              onChange={onBodyDescriptionChange}
              value={bodyDescription}
            />
            <div>
              <label>Cargar una imagen (webp)</label>
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

export default NewsAdminEdit;
