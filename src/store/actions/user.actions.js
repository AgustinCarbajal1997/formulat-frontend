import Cookies from "universal-cookie";
import BASE_URL from "../../utils/constants/base_url";
const cookies = new Cookies();
export const LOGIN = "LOGIN";
export const CONTINUE_SESSION = "CONTINUE_SESSION";
export const SIGN_UP = "SIGN_UP";
export const CLEAN_STATE = "CLEAN_STATE";
export const CLEAR_ALERT = "CLEAR_ALERT";
export const UPDATE_USER = "UPDATE_USER";
export const login = (dataUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify(dataUser),
      });
      const data = await response.json();

      if (!response.ok) {
        const throwError = {
          status: response.status || 404,
          message: data.message || "Ha ocurrido un error",
        };
        throw throwError;
      }
      cookies.set("tk", data.access_token, { maxAge: 1000000, path: "/" });

      dispatch({
        type: LOGIN,
        payload: {
          access_token: data.access_token,
          dataUser: data.dataUser,
          alert: {
            status: "success",
            message: `¡Hola ${data.dataUser.name}!`,
          },
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN,
        payload: {
          alert: {
            status: "error",
            message: `${error.message}`,
          },
        },
      });
    }
  };
};

export const continueSession = (access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/getDataUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        const throwError = {
          status: response.status || 404,
          message: data.message || "Ha ocurrido un error",
        };
        throw throwError;
      }

      dispatch({
        type: CONTINUE_SESSION,
        payload: {
          access_token,
          data: data.data,
          alert: {
            status: "success",
            message: `Bienvenido ${data.data.name}`,
          },
        },
      });
    } catch (error) {
      cookies.remove("tk", { path: "/" });
      dispatch({
        type: CLEAN_STATE,
        payload: {
          alert: {
            status: "error",
            message: `¡Sesión expirada!`,
          },
        },
      });
    }
  };
};

export const signup = (signup_data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signUp`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(signup_data),
      });
      const data = await response.json();
      if (!response.ok) {
        const throwError = {
          status: response.status || 404,
          message: data.message || "Ha ocurrido un error",
        };
        throw throwError;
      }
      const { dataUser, access_token } = data;
      cookies.set("tk", access_token, { maxAge: 1000000 });
      dispatch({
        type: SIGN_UP,
        payload: {
          access_token,
          dataUser,
          alert: { status: "success", message: "Registrado con exito" },
        },
      });
    } catch (error) {
      console.log(error)
      cookies.remove("tk", { path: "/" });
      dispatch({
        type: CLEAN_STATE,
        payload: {
          alert: {
            status: "error",
            message: `${error.message}`,
          },
        },
      });
    }
  };
};

export const cleanState = () => ({
  type: CLEAN_STATE,
});

export const updateDataUser = (dataUser) => ({
  type: UPDATE_USER,
  payload: dataUser,
});

export const clearAlert = () => ({
  type: CLEAR_ALERT,
});
