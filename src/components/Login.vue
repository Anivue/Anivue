<template>
    <v-container fill-height fluid>
        <v-row>
            <v-col>
                <div>
                    <center>
                        <h1>Login page!</h1>
                        <a :href="url">
                            <v-btn>
                                Login
                            </v-btn>
                        </a>
                        <p>Your token {{ token }}</p>
                    </center>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuthedUser } from "../utils/APIutils/AuthActions";
export default {
    data() {
        return {
            token: "",
            url: `https://anilist.co/api/v2/oauth/authorize?client_id=${this.$store.state.anilistClientId}&response_type=token`,
        };
    },
    methods: {
        getToken() {
            const hash = this.$route.hash;
            const token = hash.replace(/#access_token=(.*?)&(?:.*)/g, "$1");
            this.token = token;
            this.setUser();
        },
        async setUser() {
            const userData = await getAuthedUser(this.token);
            const user = {
                loggedIn: true,
                token: this.token,
                data: userData.data.Viewer,
            };

            this.$store.commit("setUser", user);
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
