<template>
    <h1>Search <span ref="typed"></span></h1>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";
export default {
    name: "Home",
    components: {},
    mounted() {
        new Typewriter(this.$refs.typed, {
            strings: ["Anime", "Manga", "Characters"],
            autoStart: true,
            loop: true,
        });
    },
};
</script>
