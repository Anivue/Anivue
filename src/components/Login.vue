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
                            <v-btn
                                :href="url"
                                class="navbar white--text"
                                elevation="24"
                            >
                                <v-icon small left color="white"
                                    >mdi-login</v-icon
                                >
                                <span>Login</span>
                            </v-btn>
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
            const hash = this.$route.path.split("&")[1];
            const token = hash.replace(/access_token=(.+)/g, "$1");
            this.setUser(token);
        },
        async setUser(token) {
            this.loading = true;
            const userData = await getAuthedUser(token);
            if (userData.res.ok) {
                const user = {
                    loggedIn: true,
                    token: token,
                    data: userData.data.Viewer,
                };

                // Store user in cookies
                this.$cookies.set("user", user);
                // Add user to store
                this.$store.commit("setUser", user);
            } else {
                this.loading = false;
                alert("Wrong token");
            }
            this.$router.replace({ path: "/profile" });
        },
    },
    watch: {
        "this.$route": {
            handler() {
                if (this.$route.path.split("&").length > 1) {
                    this.getToken();
                }
            },
            immediate: true,
        },
    },
};
</script>
