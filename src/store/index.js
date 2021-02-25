import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        anilistClientId: process.env.VUE_APP_ANILIST_CLIENT_ID,
        user: {
            loggedIn: false,
            token: null,
            data: {},
        },
        navLinks: [
            {
                title: "Characters",
                routePath: "/search/characters",
                icon: "mdi-human-handsup",
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
                title: "Profile",
                routePath: "/profile",
                icon: "mdi-account",
                colorProp: "profile",
            },
        ],
        icons: {
            anime: "mdi-movie",
            manga: "mdi-book",
            profile: "mdi-account",
            home: "mdi-home",
            characters: "mdi-human-handsup",
            episodes: "mdi-play-box-multiple",
            relations: "mdi-transit-connection-variant",
        },
        colors: {
            anime: {
                text: "red--text darken-1",
                block: "red darken-1",
            },
            manga: {
                text: "blue--text",
                block: "blue",
            },
            characters: {
                text: "pink--text text--lighten-2",
                block: "pink lighten-2",
            },
            home: {
                text: "light-green--text",
                block: "light-green",
            },
            profile: {
                text: "yellow--text lighten-1",
                block: "yellow lighten-1",
            },
            score: {
                super: {
                    score: 90,
                    text: "green--text",
                    icon: "green",
                    iconValue: "mdi-robot-happy",
                },
                good: {
                    score: 70,
                    text: "light-green--text",
                    icon: "light-green",
                    iconValue: "mdi-robot-happy",
                },
                meh: {
                    score: 50,
                    text: "orange--text text--lighten-1",
                    icon: "orange lighten-1",
                    iconValue: "mdi-robot",
                },
                bad: {
                    score: 0,
                    text: "red--text",
                    icon: "red",
                    iconValue: "mdi-robot-dead",
                },
                none: {
                    text: "grey--text text-lighten-1",
                    icon: "grey lighten-1",
                    iconValue: "mdi-robot-confused",
                },
            },
            gradient: {
                bannerImage: {
                    dark:
                        "0deg, rgba(0,0,0,0.8225490025111607) 0%, rgba(255,255,255,0) 100%",
                    light:
                        "0deg, rgba(52,52,52,0.4402354691876751) 0%, rgba(179,179,179,0.18253238795518212) 100%",
                },
            },
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user.loggedIn = payload.loggedIn;
            state.user.token = payload.token;
            state.user.data = payload.data;
        },
        clearUser(state) {
            state.user = {
                loggedIn: false,
                token: null,
                data: {},
            };
        },
    },
    actions: {},
    modules: {},
});
