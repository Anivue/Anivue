import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
// import MediaHome from "../views/MediaHome.vue";
// import Favorites from "../views/Favorites.vue";

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
        component: () => import("../views/Favorites.vue"),
    },
    {
        path: "/search/:type",
        name: "MediaHome",
        component: () => import("../views/MediaHome.vue"),
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

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start();
    }
    next();
});

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});

export default router;
