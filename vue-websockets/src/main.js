import { createApp } from 'vue';

import App from './App.vue';
import store from '../src/store/index.js';
import BaseDialog from '../src/components/base/BaseDialog.vue';
import BaseButton from '../src/components/base/BaseButton.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import router from './routes/routes.js';


const app = createApp(App);

app.use(store);

app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas);

app.component('base-dialog', BaseDialog);
app.component('base-button', BaseButton);


app.mount('#app');
