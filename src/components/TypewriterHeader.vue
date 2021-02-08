<template>
    <v-container fluid class="mb-0 pa-0">
        <v-row>
            <v-col class="d-flex justify-center">
                <v-img
                    class="mb-5 elevation-0"
                    lazy-src="../assets/anivueBannerBlur-min.jpg"
                    src="../assets/anivueBannerBlur.jpg"
                    max-height="360"
                    min-height="150"
                    gradient="0deg, rgba(0,0,0,0.7973389184775472) 6%, rgba(0,0,0,0.8001400389257265) 86%"
                >
                    <v-row
                        class="fill-height ma-0 insetShadow"
                        align="center"
                        justify="center"
                    >
                        <h1>
                            <span class="font-weight-light">Explore </span>
                            <span ref="typed"></span>
                        </h1>
                    </v-row>
                </v-img>
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

<style lang="scss" scoped>
.typewriter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.insetShadow {
    box-shadow: 0 -10px 10px #181818 inset;
}
</style>
