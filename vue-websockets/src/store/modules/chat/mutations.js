export default {
  setUsers(state, users) {
    state.users = users;
  },
  setSelectedUser(state, user) {
    state.selectedUser = user;
  },
  setChatMessages(state, messageList) {
    state.messageList = messageList;
  }
};
