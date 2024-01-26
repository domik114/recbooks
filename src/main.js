import { createApp } from 'vue'
//import App from './App.vue'
import MainHome from './MainHome.vue';
import router from './router';
import store from './store';

createApp(MainHome).use(router).use(store).mount('#app')
