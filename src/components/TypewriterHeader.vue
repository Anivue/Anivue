<template>
    <v-container fluid class="mb-0 pa-0">
        <v-row
            class="fill-height my-10 flex-column"
            align="center"
            justify="center"
        >
            <h1 class="primary--text">
                Anivue<span class="light-green--text text--accent-4">.</span>ru
            </h1>
            <h1 class="primary--text my-3">
                <span class="font-weight-light">Explore </span>
                <span ref="typed"></span>
            </h1>
            <div>
                <v-btn
                    class="ma-3"
                    v-for="(button, i) in buttons"
                    :key="i"
                    color="navbar white--text"
                    elevation="5"
                    :to="{ path: button.route }"
                >
                    <span v-if="md">{{ button.title }}</span>
                    <v-icon :right="md">
                        {{ button.icon }}
                    </v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";
export default {
    data() {
        return {
            md: window.innerWidth >= 960,
            colors: this.$store.state.colors,
            buttons: [
                {
                    title: "Manga",
                    icon: this.$store.state.icons.manga,
                    route: "/search/manga",
                },
                {
                    title: "Anime",
                    icon: this.$store.state.icons.anime,
                    route: "/search/anime",
                },
                {
                    title: "Characters",
                    icon: this.$store.state.icons.characters,
                    route: "/search/characters",
                },
            ],
        };
    },
    methods: {
        setMd() {
            this.md = window.innerWidth >= 960;
        },
    },
    mounted() {
        window.addEventListener("resize", this.setMd);

        new Typewriter(this.$refs.typed, {
            strings: [
                `<span class='${this.colors.anime.text}'>Anime</span>`,
                `<span class='${this.colors.manga.text}'>Manga</span>`,
                `<span class='${this.colors.characters.text}'>Characters</span>`,
            ],
            autoStart: true,
            loop: true,
            delay: 100,
            deleteSpeed: 30,
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setMd);
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
