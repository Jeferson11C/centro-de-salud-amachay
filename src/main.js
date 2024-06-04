import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import './style.css'
import App from './App.vue'

// PrimeFlex
import 'primeflex/primeflex.css';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import axios from 'axios';

import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Card from "primevue/card";
import InputText from "primevue/inputtext";

import router from "./router/index.js";

createApp(App)
    .use(PrimeVue)
    .use(router)
    .use(axios)
    .component('pv-button', Button)
    .component('pv-column', Column)
    .component('pv-data-table', DataTable)
    .component('pv-card', Card)
    .component('pv-input-text', InputText)
    .mount('#app')