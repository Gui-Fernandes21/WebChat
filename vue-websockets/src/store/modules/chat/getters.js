export default {
  fetchUsers(state) {
    return state.users;
  },
  getSelectedUser(state) {
    return state.selectedUser;
  },
  getMessages(state) {
    return state.messageList
  }
}
