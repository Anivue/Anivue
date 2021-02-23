<template>
    <v-btn :loading="loading" icon color="pink" @click="toggleFav">
        <v-icon>
            {{ isFav ? "mdi-heart" : "mdi-heart-outline" }}
        </v-icon>
    </v-btn>
</template>

<script>
import toggleFavorite from "../../utils/APIutils/AuthModules/toggleFavorite";
import checkForFav from "../../utils/checkForFav";
import { getAuthedUser } from "../../utils/APIutils/AuthActions";
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
        id: {
            type: [Number, String],
            required: true,
        },
        fav: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            token: this.$store.state.user.token,
            loading: false,
            error: false,
            isFav: this.fav,
        };
    },
    methods: {
        async toggleFav() {
            this.loading = true;
            const res = await toggleFavorite(this.token, this.type, this.id);
            this.loading = false;
            this.isFav = !this.isFav;
            this.error = res.ok;
            this.updateUser();
        },
        updateUser() {
            // Update user's data
            const token = this.$store.state.user.token;
            getAuthedUser(token)
                .then((userData) => {
                    const user = {
                        loggedIn: true,
                        token: token,
                        data: userData.data.Viewer,
                    };
                    // Store user in cookies
                    this.$cookies.set("user", user);
                    // Add user to store
                    this.$store.commit("setUser", user);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        const userFavorites = this.$store.state.user.data.favourites[this.type]
            .nodes;
        this.isFav = checkForFav(userFavorites, this.id);
    },
};
</script>

<style lang="scss" scoped></style>
