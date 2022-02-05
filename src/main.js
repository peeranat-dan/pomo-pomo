import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './index.css';
import 'flowbite';
import router from './route/route.js';

const pinia = createPinia();



createApp(App).use(router).use(pinia).mount('#app');
