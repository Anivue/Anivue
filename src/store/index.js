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
                colorProp: "characters",
            },
            {
                title: "Anime",
                routePath: "/search/anime",
                icon: "mdi-movie",
                colorProp: "anime",
            },
            {
                title: "Home",
                routePath: "/home",
                icon: "mdi-home",
                colorProp: "home",
            },

            {
                title: "Manga",
                routePath: "/search/manga",
                icon: "mdi-book",
                colorProp: "manga",
            },
            {
                title: "Favorites",
                routePath: "/favorites",
                icon: "mdi-star",
                colorProp: "favs",
            },
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
            characters: {
                text: "purple--text accent-3",
                block: "purple accent-3",
            },
            home: {
                text: "light-green--text",
                block: "light-green",
            },
            favs: {
                text: "yellow--text lighten-1",
                block: "yellow lighten-1",
            },
        },
    },
    mutations: {},
    actions: {},
    modules: {},
});
