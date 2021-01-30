import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //! Only 5 navLinks allowed
        navLinks: [
            {
                title: "Characters",
                routePath: "/search/characters",
                icon: "mdi-account-group",
            },
            { title: "Anime", routePath: "/search/anime", icon: "mdi-movie" },
            { title: "Home", routePath: "/home", icon: "mdi-home" },

            { title: "Manga", routePath: "/search/manga", icon: "mdi-book" },
            { title: "Favorites", routePath: "/favorites", icon: "mdi-star" },
        ],
        colors: {
            anime: {
                text: "orange--text",
                block: "orange accent-4",
            },
            manga: {
                text: "blue--text",
                block: "blue accent-4",
            },
            charactes: {
                text: "purple--text accent-3",
                block: "purple accent-3",
            },
        },
    },
    mutations: {},
    actions: {},
    modules: {},
});
