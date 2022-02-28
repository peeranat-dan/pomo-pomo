import { createRouter, createWebHistory } from "vue-router"; // import function to create router and history
// import Vue components
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Error from '../views/Error.vue';

const checkLeave = (to, from) => {
    console.log(to, from)
}

const routes = [ // declare routes
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home,
        beforeRouteLeave: [checkLeave]
    },
    { path: '/about', name: 'About', component: About },
    { path: '/:pathMatch(.*)*', name: 'Error', component: Error}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;