import actions from './actions.js';
import mutations from './mutations.js'
import getters from './getters.js'

export default {
  state() {
    return {
      selectedUser: null,
      messageList: [],
      users: []
    }
  },
  actions,
  mutations,
  getters
}