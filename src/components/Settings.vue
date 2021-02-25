<template>
    <v-container fill-height>
        <v-row>
            <v-col class="d-flex justify-center">
                <v-btn @click="logout" class="navbar my-5 white--text">
                    <v-icon color="white" left>mdi-logout</v-icon>
                    Logout
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    methods: {
        logout() {
            // REMOVE USER FROM CACHE
            this.$cookies.remove("user");
            // REMOVE USER FROM STORE
            this.$store.commit("clearUser");
            // REDIRECT TO HOME PAGE
            this.$router.replace({ path: "/home" });
        },
    },
};
</script>
