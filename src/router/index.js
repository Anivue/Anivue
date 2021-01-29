import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MediaHome from "../views/MediaHome.vue";
import Favorites from "../views/Favorites.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/favorites",
        name: "Favorites",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Favorites,
    },
    {
        path: "/search/:type",
        name: "MediaHome",
        component: MediaHome,
        props: true,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

export default router;
