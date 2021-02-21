<template>
    <v-bottom-navigation
        v-model="currentBtn"
        app
        id="nav"
        fixed
        shift
        class="align-center elevation-0"
    >
        <div class="navbarBtns navbar rounded-t elevation-24">
            <v-tooltip
                top
                v-for="(navLink, i) in navLinks"
                :key="i"
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
                        <v-icon :color="i === currentBtn ? '' : 'white'">{{
                            navLink.icon
                        }}</v-icon>
                    </v-btn>
                </template>
                <span>{{ navLink.title }}</span>
            </v-tooltip>
        </div>
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
    data() {
        return {
            currentBtn: 2,
        };
    },
};
</script>

<style lang="scss" scoped>
#nav {
    // background: rgb(39, 39, 39);
    background: transparent;
}

.navbarBtns {
    height: 56px;
}
</style>
