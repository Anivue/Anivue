<template>
    <v-app>
        <appbar />
        <v-main class="pb-14 grey darken-4">
            <keep-alive>
                <router-view :key="$route.fullPath" />
            </keep-alive>
        </v-main>
        <navbar class="d-none d-sm-flex" />
    </v-app>
</template>

<script>
import Appbar from "./components/Appbar.vue";
import Navbar from "./components/Navbar.vue";

export default {
    name: "App",

    components: {
        Navbar,
        Appbar,
    },

    data: () => ({
        //
    }),
};
</script>
