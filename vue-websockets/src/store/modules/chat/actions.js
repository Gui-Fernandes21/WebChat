export default {
  async fetchAllUsers(context) {
    const isAuth = context.rootGetters.isAuth;
    if (!isAuth) return;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/fetch-all-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });

      const { users } = await response.json();

      if (!response.ok) {
        const error = new Error('Failed to parse the Users');
        throw error;
      }

      context.commit('setUsers', users);
    } catch (err) {
      console.log(err);
      const error = new Error('Failed to fetch all users');
      throw error;
    }
  },
  async fetchUser(context, userId) {
    const isAuth = context.rootGetters.isAuth;
    
    if (!isAuth) {
      throw new Error('Not Authenticated');
    }

    const token = context.getters.token;

    try {
      const result = await fetch('http://localhost:3000/fetch-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          userId
        })
      });

      const { user } = await result.json();

      if (!result.ok) {
        const error = new Error('Failed to Fetch User!');
        throw error;
      }

      context.commit('setSelectedUser', user);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to Fetch');
    }
  },
  async fetchChatMessages(context) {
    const isAuth = context.rootGetters.isAuth;

    if (!isAuth) {
      throw new Error('Not Authenticated');
    }

    const token = context.getters.token;
    const selectedUser = context.getters.getSelectedUser;

    try {
      const result = await fetch('http://localhost:3000/fetch-chat-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          selectedUserId: selectedUser._id
        })
      });

      const { chatMessageList } = await result.json();

      if (!result.ok) {
        const error = new Error('Failed to Fetch Chat Messages!');
        throw error;
      }

      context.commit('setChatMessages', chatMessageList);
    } catch (err) {
      console.log(err);
      throw new Error('Ocurred an error in fetching from the server');
    }
  }
};
