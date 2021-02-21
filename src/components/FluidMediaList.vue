<template>
    <v-container>
        <v-row>
            <v-col class="text-center mb-6">
                <h5 class="text-h4 mb-3 font-weight-light primary--text">
                    Top 10
                    <span
                        :class="colors[type.toLowerCase()].text"
                        class="font-weight-bold"
                        >{{ title }}</span
                    >
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="switchTab"
                                icon
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>
                                    {{ mediaIcon }}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Swtitch to {{ nextTab }}</span>
                    </v-tooltip>
                </h5>
                <p class="text-subtitle secondary--text">
                    Based on users rating
                </p>
            </v-col>
            <v-col cols="12" v-if="loading">
                <fluid-media-item-loader
                    v-for="(emptyItem, index) in media"
                    :key="index"
                    :index="index"
                />
            </v-col>
            <v-col v-else cols="12">
                <fluid-media-item
                    v-for="(anime, i) in media"
                    :key="i"
                    :loading="loading"
                    :index="i"
                    :media="anime"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FluidMediaItem from "./FluidMediaItem.vue";
import FluidMediaItemLoader from "./FluidMediaItemLoader";
import { getMediaPage } from "../utils/APIutils/Anime";
export default {
    components: {
        FluidMediaItem,
        FluidMediaItemLoader,
    },
    data() {
        return {
            media: Array(10),
            colors: this.$store.state.colors,
            mangaIcon: this.$store.state.icons.manga,
            animeIcon: this.$store.state.icons.anime,
            type: "ANIME",
            loading: true,
        };
    },
    computed: {
        mediaIcon() {
            return this.type === "ANIME" ? this.animeIcon : this.mangaIcon;
        },
        title() {
            return this.type === "ANIME" ? "Anime" : "Manga";
        },
        nextTab() {
            return this.type === "ANIME" ? "Manga" : "Anime";
        },
    },
    methods: {
        switchTab() {
            if (this.type === "ANIME") {
                this.type = "MANGA";
            } else {
                this.type = "ANIME";
            }
        },
        fetchMedia() {
            this.loading = true;
            const variables = {
                sortBy: "SCORE_DESC",
                type: this.type,
                pageNumber: 1,
                perPage: 10,
            };
            getMediaPage(variables)
                .then((res) => {
                    this.media = res.data.Page.media;
                    this.loading = false;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.fetchMedia();
    },
    watch: {
        type: {
            handler() {
                this.fetchMedia();
            },
        },
    },
};
</script>
