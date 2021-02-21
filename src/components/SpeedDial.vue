<template>
    <v-speed-dial
        v-model="fab"
        class="d-fixed d-sm-none"
        fixed
        app
        bottom
        right
        direction="top"
    >
        <template v-slot:activator>
            <v-btn elevation="24" large color="navbar white--text" fab>
                <v-icon v-if="fab">
                    mdi-close
                </v-icon>
                <v-icon v-else>
                    mdi-menu
                </v-icon>
            </v-btn>
        </template>
        <v-btn
            fab
            class="navbar white--text"
            medium
            color="#4a4a4a"
            @click="scrollToTop"
        >
            <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn
            fab
            small
            dark
            v-for="navLink in navLinks"
            :key="navLink.title"
            :to="navLink.routePath"
            :color="colors[navLink.title.toLowerCase()].block"
        >
            <v-icon>{{ navLink.icon }}</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
    data() {
        return {
            fab: false,
            navLinks: this.$store.state.navLinks,
            colors: this.$store.state.colors,
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
    },
};
</script>
