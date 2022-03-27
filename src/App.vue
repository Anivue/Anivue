<template>
    <v-app>
        <appbar class="z-index" />
        <v-main class="pb-md-15 pt-md-0 overflow-hidden-x background">
            <keep-alive :include="['Home', 'Profile']">
                <router-view />
            </keep-alive>
        </v-main>
        <speed-dial />
        <navbar class="d-none d-sm-flex z-index" />
    </v-app>
</template>

<script>
import Appbar from "./components/Appbar.vue";
import Navbar from "./components/Navbar.vue";
import SpeedDial from "./components/SpeedDial";

export default {
    name: "App",

    components: {
        Navbar,
        Appbar,
        SpeedDial,
    },

    mounted() {
        // Adapt for system theme
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            this.$vuetify.theme.dark = true
        }
        // Watch for system theme change
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                this.$vuetify.theme.dark = e.matches
            })
    },
};
</script>

<style lang="scss">
.overflow-hidden-x {
    overflow-x: hidden;
}

.z-index {
    z-index: 9999 !important;
}
</style>
