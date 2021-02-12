<template>
    <v-app>
        <appbar />
        <v-main class="pb-md-15 pt-md-0 page-dark overflow-hidden-x">
            <!-- CACHE EXAMPLE -->
            <keep-alive include="Home">
                <router-view />
            </keep-alive>

            <!-- <router-view /> -->
        </v-main>
        <speed-dial />
        <navbar class="d-none d-sm-flex" />
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

    data: () => ({
        //
    }),
};
</script>

<style lang="scss">
.page-dark {
    background-color: #181818;
    border-color: #181818;
}

.overflow-hidden-x {
    overflow-x: hidden;
}
</style>
