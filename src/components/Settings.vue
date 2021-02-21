<template>
    <div>
        <h1 class="font-weight-light text-center primary--text">
            Settings
        </h1>
        <v-btn @click="logout" class="navbar white--text">Logout</v-btn>
    </div>
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
