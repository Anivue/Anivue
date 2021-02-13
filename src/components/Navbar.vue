<template>
    <v-bottom-navigation
        app
        id="nav"
        fixed
        dark
        shift
        class="align-center elevation-24"
    >
        <v-tooltip
            top
            v-for="navLink in navLinks"
            :key="navLink.title"
            height="100%"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    :to="navLink.routePath"
                    :class="colors[navLink.colorProp].text"
                >
                    <span>{{ navLink.title }}</span>
                    <v-icon>{{ navLink.icon }}</v-icon>
                </v-btn>
            </template>
            <span>{{ navLink.title }}</span>
        </v-tooltip>
    </v-bottom-navigation>
</template>

<script>
export default {
    computed: {
        navLinks() {
            return this.$store.state.navLinks;
        },
        colors() {
            return this.$store.state.colors;
        },
    },
};
</script>

<style lang="scss" scoped>
#nav {
    background: rgb(39, 39, 39);
}
</style>
