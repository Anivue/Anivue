import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/search",
        name: "search",
        component: () => import("../views/Search.vue"),
        props: true,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/search/:type",
        name: "mediahome",
        component: () => import("../views/MediaHome.vue"),
        props: true,
    },
    {
        path: "/search/:type/:id",
        name: "mediafullpage",
        component: () => import("../views/MediaFullPage.vue"),
        props: true,
    },
    {
        path: "/404",
        name: "404",
        component: () => import("../views/NotFound.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile.vue"),
    },
    {
        path: "*",
        name: "notfound",
        redirect: "/404",
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
