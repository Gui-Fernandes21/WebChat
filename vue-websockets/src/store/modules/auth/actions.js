let timer;

export default {
  logout(context) {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      user: null
    });

    context.commit('setUsers', []);
    context.commit('setSelectedUser', null);
    context.commit('setChatMessages', []);
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
  async login(context, payload) {
    try {
      const result = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resultData = await result.json();

      if (!result.ok) {
        console.log(resultData);
        const error = new Error(
          resultData.message || 'Failed to Authenticate!'
        );
        throw error;
      }

      const expiresIn = 60 * 60 * 1000;
      // const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('token', resultData.token);
      localStorage.setItem('userId', resultData.user._id);

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', resultData);
      console.log('success');
      context.dispatch('fetchAllUsers');
    } catch (err) {
      console.log(err);
    }
  },
  async signup(context, payload) {
    try {
      const result = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const resultData = await result.json();

      if (!result.ok) {
        console.log(resultData);
        const error = new Error(
          resultData.message || 'Failed to authenticate!'
        );
        throw error;
      }

      const expiresIn = 60 * 60 * 1000;

      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('token', resultData.token);
      localStorage.setItem('userId', resultData.user._id);

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', resultData);
      console.log(resultData.message);
      context.dispatch('fetchAllUsers');
    } catch (err) {
      console.log(err);
    }
  },
  async autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('expirationDate');

    const expiresIn = tokenExpiration - new Date().getTime();

    if (expiresIn <= 0) return;

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

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && user) {
      context.commit('setUser', {
        token: token,
        user: user
      });
      context.dispatch('fetchAllUsers');
    }
  }
};
