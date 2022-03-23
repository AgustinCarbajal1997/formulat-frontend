const PASS_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const REGULAR_EXPRESSION = {
  oldPassword: PASS_REGEX,
  newPassword:PASS_REGEX
};
export default REGULAR_EXPRESSION;
