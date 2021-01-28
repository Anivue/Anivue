<template>
    <v-bottom-navigation
        :value="1"
        grow
        id="nav"
        fixed
        dark
        shift
        class="d-flex align-center"
    >
        <v-btn height="100%">
            <span>Search</span>

            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn height="100%">
            <span>Profile</span>

            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn height="100%" to="/search/anime">
            <span>Anime</span>

            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn height="100%" to="/search/manga">
            <span>Manga</span>

            <v-icon>mdi-book</v-icon>
        </v-btn>

        <v-btn height="100%" to="/about">
            <span>Favorites</span>

            <v-icon>mdi-star</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#nav {
    background: rgb(39, 39, 39);
}
</style>
