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
    // {
    //     path: "/favorites",
    //     name: "favorites",
    //     component: () => import("../views/Favorites.vue"),
    // },
    {
        path: "/search/:type",
        name: "mediahome",
        component: () =>
            import(/* webpackChunkName: "media" */ "../views/MediaHome.vue"),
        props: true,
    },
    {
        path: "/search/:type/:id",
        name: "mediafullpage",
        component: () =>
            import(
                /* webpackChunkName: "media" */ "../views/MediaFullPage.vue"
            ),
        props: true,
    },
    {
        path: "*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
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
