import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import chatModule from './modules/chat/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    chat: chatModule
  }
});

export default store;
