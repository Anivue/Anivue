<template>
    <v-container fill-height fluid>
        <v-row>
            <v-col>
                <div>
                    <center>
                        <div v-if="loading">
                            <media-loading />
                        </div>
                        <div v-else>
                            <h1 class="primary--text">Log in to Anivue</h1>
                            <p class="secondary--text">
                                You will be redirected to Anilist login page
                            </p>
                            <a :href="url">
                                <v-btn
                                    class="navbar white--text"
                                    elevation="24"
                                >
                                    Login
                                </v-btn>
                            </a>
                        </div>
                    </center>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaLoading from "./MediaLoading";
import { getAuthedUser } from "../utils/APIutils/AuthActions";
export default {
    components: {
        MediaLoading,
    },
    data() {
        return {
            loading: false,
            url: `https://anilist.co/api/v2/oauth/authorize?client_id=${this.$store.state.anilistClientId}&response_type=token`,
        };
    },
    methods: {
        getToken() {
            const hash = this.$route.hash;

            const token = hash.replace(/#access_token=(.*?)&(?:.*)/g, "$1");
            this.setUser(token);
        },
        async setUser(token) {
            this.loading = true;
            const userData = await getAuthedUser(token);
            const user = {
                loggedIn: true,
                token: token,
                data: userData.data.Viewer,
            };

            // Store user in cookies
            this.$cookies.set("user", user);
            // Add user to store
            this.$store.commit("setUser", user);
            // Remove hash from url
            this.$router.replace({ path: "/profile" });
        },
    },
    watch: {
        "this.$route": {
            handler() {
                if (this.$route.hash) {
                    this.getToken();
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped></style>
