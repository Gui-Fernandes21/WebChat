export default {
  token(state) {
    return state.token;
  },
  isAuth(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
  userId(state) {
    return state.user._id;
  },
  getUsername(state) {
    if (!state.user) return;
    return state.user.name;
  },
  getUser(state) {
    if (!state.user) return;
    return state.user;
  }
};
