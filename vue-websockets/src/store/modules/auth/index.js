import authGetters from './getters.js';
import authMutations from './mutations.js';
import authActions from './actions.js';

export default {
  state() {
    return {
      token: null,
      user: null,
      didAutoLogout: false,
    };
  },
  actions: authActions,
  mutations: authMutations,
  getters: authGetters
};
