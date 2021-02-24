<template>
    <div class="d-inline">
        <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    :loading="loading"
                    icon
                    color="pink"
                    @click="toggleFav"
                >
                    <v-icon>
                        {{ isFav ? "mdi-heart" : "mdi-heart-outline" }}
                    </v-icon>
                </v-btn>
            </template>
            <span>
                {{ isFav ? "Remove from favorites" : "Add to favorites" }}
            </span>
        </v-tooltip>
        <v-snackbar
            elevation="24"
            color="orange"
            rounded
            v-model="snackbar"
            :timeout="snackbarTimeout"
        >
            <v-icon left>
                {{ isFav ? "mdi-star" : "mdi-star-remove" }}
            </v-icon>
            <span class="font-weight-bold">
                {{ isFav ? "Added to favorites" : "Removed from favorites" }}
            </span>
        </v-snackbar>
    </div>
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
            snackbar: false,
            snackbarTimeout: 2000, // in ms
        };
    },
    methods: {
        async toggleFav() {
            this.loading = true;
            const res = await toggleFavorite(this.token, this.type, this.id);
            this.loading = false;
            this.isFav = !this.isFav;
            this.snackbar = true;
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
