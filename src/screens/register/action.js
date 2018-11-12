function register(user) {
  return (dispatch) => {
    console.log(dispatch, user);
  };
}
export const userActions = {
  register,
};
