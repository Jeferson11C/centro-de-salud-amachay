import {createRouter, createWebHistory} from "vue-router";
import Ubicacion from "../amachay/pages/ubicacion.component.vue";
import Amachay from "../amachay/pages/amachay.component.vue";

const router = createRouter( {
    history: createWebHistory(),
    routes: [
        { path: "/",        redirect: "/amachay"},
        { path: "/ubicacion", component: Ubicacion, meta: { title: "Ubicacion"}},
        { path: "/amachay", component: Amachay, meta: { title: "Amachay"}}
    ]
});

export default router;