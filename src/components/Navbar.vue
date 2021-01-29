<template>
    <v-bottom-navigation
        app
        grow
        id="nav"
        fixed
        dark
        shift
        class="align-center"
    >
        <v-btn
            v-for="navLink in navLinks"
            :key="navLink.title"
            height="100%"
            :to="navLink.routePath"
        >
            <span>{{ navLink.title }}</span>

            <v-icon>{{ navLink.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    data() {
        return {
            navLinks: this.$store.state.navLinks,
        };
    },
};
</script>

<style lang="scss" scoped>
#nav {
    background: rgb(39, 39, 39);
}
</style>
