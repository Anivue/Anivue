<template>
    <div>
        <v-img
            class="mb-5"
            :lazy-src="anime.bannerImage"
            :src="anime.bannerImage"
        >
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <v-container>
            <v-row class="mb-10 elevation-24 pa-4">
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    class="d-flex justify-center justify-md-start"
                >
                    <div class="d-flex flex-column">
                        <v-card width="250" max-height="372" elevation="24">
                            <v-img
                                :lazy-src="anime.coverImage.medium"
                                :src="anime.coverImage.large"
                            >
                                <template v-slot:placeholder>
                                    <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                    >
                                        <v-progress-circular
                                            indeterminate
                                            color="grey lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-card>
                        <h4>hello</h4>
                    </div>
                </v-col>
                <v-col
                    md="9"
                    class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
                >
                    <h2 class="mb-10 text-h4">{{ title }}</h2>

                    <p
                        class="subtitle-1 text--secondary"
                        v-html="anime.description"
                    ></p>
                    <genre-chips :genres="anime.genres" />
                </v-col>
            </v-row>

            <v-tabs
                grow
                v-model="tab"
                class="elevation-24"
                :color="anime.coverImage.color"
            >
                <v-tab href="#characters-tab">Characters</v-tab>
                <v-tab href="#episodes-tab">Episodes</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="elevation-24">
                <v-tab-item :transition="false" value="characters-tab">
                    <v-row class="ma-md-3 my-1">
                        <v-col cols="12">
                            <media-grid
                                :charactersGrid="true"
                                :loading="loading"
                                :media="anime.characters.nodes"
                            />
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item :transition="false" value="episodes-tab">
                    <v-row class="ma-3">
                        <v-col
                            cols="6"
                            sm="4"
                            v-for="(episode, index) in anime.streamingEpisodes"
                            :key="index"
                        >
                            <episode-card
                                :title="episode.title"
                                :thumbnail="episode.thumbnail"
                                :url="episode.url"
                            />
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>

<script>
import EpisodeCard from "../components/EpisodeCard.vue";
import GenreChips from "../components/GenreChips.vue";
import MediaGrid from "../components/MediaGrid.vue";
import { getAnimeById } from "../utils/APIutils/Anime";
export default {
    components: {
        MediaGrid,
        EpisodeCard,
        GenreChips,
    },
    props: {
        id: {
            type: [String, Number],
            required: true,
        },
    },
    data() {
        return {
            loading: true,
            anime: {},
            tab: null,
        };
    },
    computed: {
        title() {
            if ("english" in this.anime.title) {
                return this.anime.title.english;
            } else {
                return this.anime.title.romaji;
            }
        },
    },
    created() {
        this.loading = true;
        getAnimeById(this.id)
            .then(anime => {
                this.anime = anime.Media;
                this.loading = false;
                console.log(this.anime);
            })
            .catch(err => {
                console.log(err);
            });
    },
};
</script>
