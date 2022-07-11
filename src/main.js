import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import MasonryWall from '@yeger/vue-masonry-wall';

const axiosInstance = axios.create({
    withCredentials: true,
  })
  const app = createApp(App)
  app.config.globalProperties.$axios = { ...axiosInstance }

app.use(router).use(MasonryWall).use(createPinia()).mount('#app')
