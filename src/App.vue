<template>
    <v-app>
        <v-main class="pb-14 grey darken-4">
            <router-view />
        </v-main>
        <navbar />
    </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    name: "App",

    components: {
        Navbar,
    },

    data: () => ({
        //
    }),
};
</script>
