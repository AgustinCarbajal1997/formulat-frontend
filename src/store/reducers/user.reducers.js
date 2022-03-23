import {
  LOGIN,
  CONTINUE_SESSION,
  CLEAN_STATE,
  SIGN_UP,
  CLEAR_ALERT,
  UPDATE_USER,
} from "../actions/user.actions.js";
const INITIAL_STATE = {
  access_token: null,
  dataUser: null,
  alert: null,
};
const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        access_token: action.payload.access_token,
        dataUser: action.payload.dataUser,
        alert: action.payload.alert,
      };
    case CONTINUE_SESSION:
      return {
        ...state,
        access_token: action.payload.access_token,
        dataUser: action.payload.data,
      };
    case SIGN_UP:
      return {
        ...state,
        access_token: action.payload.access_token,
        dataUser: action.payload.dataUser,
        alert: action.payload.alert,
      };
    case UPDATE_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
    case CLEAN_STATE:
      return {
        ...state,
        dataUser: null,
        access_token: null,
        alert: action?.payload?.alert || null,
      };
    case CLEAR_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
};
export default UserReducer;
