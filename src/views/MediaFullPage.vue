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
                </v-col>
                <v-col
                    md="9"
                    class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
                >
                    <h2 class="mb-3 text-h4">{{ title }}</h2>

                    <p
                        class="subtitle-1 text--secondary"
                        v-html="anime.description"
                    ></p>
                    <genre-chips :genres="anime.genres" />
                </v-col>
            </v-row>
            <v-row class="mb-10">
                <section-header
                    icon="mdi-account-group"
                    title="Characters"
                    justify="start"
                />
                <v-col cols="12">
                    <media-grid
                        :charactersGrid="true"
                        :loading="loading"
                        :limit="6"
                        :media="anime.characters.nodes"
                    />
                </v-col>
            </v-row>

            <v-row>
                <section-header
                    icon="mdi-filmstrip"
                    title="Episodes"
                    justify="start"
                />
                <v-col cols="6" sm="4" v-for="n in 24" :key="n">
                    <episode-card />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import EpisodeCard from "../components/EpisodeCard.vue";
import GenreChips from "../components/GenreChips.vue";
import MediaGrid from "../components/MediaGrid.vue";
import SectionHeader from "../components/SectionHeader.vue";
import { getAnimeById } from "../utils/APIutils/Anime";
export default {
    components: {
        MediaGrid,
        SectionHeader,
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
        };
    },
    computed: {
        title(titlesObj) {
            if ("english" in titlesObj) {
                return titlesObj.english;
            } else {
                return titlesObj.romaji;
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
