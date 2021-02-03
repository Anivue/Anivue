<template>
    <v-container class="my-10">
        <v-row>
            <v-col class="d-flex justify-center">
                <h1>Explore <span ref="typed"></span></h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";
export default {
    data() {
        return {
            colors: this.$store.state.colors,
        };
    },
    mounted() {
        new Typewriter(this.$refs.typed, {
            strings: [
                `<span class='${this.colors.anime.text}'>Anime</span>`,
                `<span class='${this.colors.manga.text}'>Manga</span>`,
                `<span class='${this.colors.characters.text}'>Characters</span>`,
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: "natural",
        });
    },
};
</script>

<style lang="scss" scoped></style>
