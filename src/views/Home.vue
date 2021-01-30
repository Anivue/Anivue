<template>
    <div>
        <h1>Search <span ref="typed"></span></h1>
        <trending-section sectionType="anime" />
        <trending-section sectionType="manga" />
    </div>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";
import TrendingSection from "../components/TrendingSection.vue";
export default {
    name: "Home",
    components: { TrendingSection },
    mounted() {
        new Typewriter(this.$refs.typed, {
            strings: ["Anime", "Manga", "Characters"],
            autoStart: true,
            loop: true,
        });
    },
};
</script>
