import { createWebHistory, createRouter } from 'vue-router';

import ChatArea from '../components/ChatArea.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ChatArea }
  ]
});

export default router;
