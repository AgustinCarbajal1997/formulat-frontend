export const formReducer = (state, action) => {
  switch (action.type) {
    case "MODIFY_INPUT":
      const newmodification = {
        value: action.payload.value,
        onBlur: action.payload.onBlur,
        checked: action.payload.checked,
      };
      return {
        ...state,
        [action.payload.item]: newmodification,
      };
    case "BLUR_REGEX":
      const blurModification = {
        ...state[action.payload],
        onBlur: true,
      };
      return {
        ...state,
        [action.payload]: blurModification,
      };
    case "TOTAL_BLUR_REGEX":
      let newState = Object.keys(state).reduce(
        (obj, item) => ({ ...obj, [item]: { ...state[item], onBlur: true } }),
        {}
      );
      return newState;
    default:
      return state;
  }
};
