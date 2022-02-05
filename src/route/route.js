import { createRouter, createWebHistory } from "vue-router"; // import function to create router and history
// import Vue components
import Home from '../views/Home.vue';
import Error from '../views/Error.vue';

const routes = [ // declare routes
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/:pathMatch(.*)*', name: 'Error', component: Error}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;