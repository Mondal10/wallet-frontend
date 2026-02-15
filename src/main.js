import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.css';
import "vue-toastification/dist/index.css";
import App from './App.vue';
import Toast from "vue-toastification";
import router from '~/common/router/';

const app = createApp(App);
const pinia = createPinia()

const options = {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
    icon: false,
    showCloseButtonOnHover: true,
    closeButton: 'button',
};

app.use(pinia);
app.use(router);
app.use(Toast, options);
app.mount('#app');
