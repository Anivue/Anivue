<template>
    <div>
        <v-container class="my-10">
            <v-row>
                <v-col class="d-flex justify-center">
                    <h1>Explore <span ref="typed"></span></h1>
                </v-col>
            </v-row>
        </v-container>
        <!-- Anime -->
        <trending-section sectionType="anime" />
        <!-- Manga -->
        <trending-section sectionType="manga" />
        <!-- Characters -->
        <trending-section sectionType="characters" />
    </div>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";
import TrendingSection from "../components/TrendingSection.vue";
export default {
    name: "Home",
    components: { TrendingSection },
    computed: {
        colors() {
            return this.$store.state.colors;
        },
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
