<template>
    <v-app>
        <appbar />
        <v-main class="pb-md-15 pt-md-0 overflow-hidden-x background">
            <keep-alive :include="['Home', 'Profile']">
                <router-view />
            </keep-alive>
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

    mounted() {
        //? Check if user was authenticated before
        const user = this.$cookies.get("user");
        if (user) {
            this.$store.commit("setUser", user);
        }
    },
};
</script>

<style lang="scss">
.overflow-hidden-x {
    overflow-x: hidden;
}
</style>
