<template>
    <div>
        <v-img
            class="mb-5"
            lazy-src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/124845-uw8Fiw3kWtbj.jpg"
            src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/124845-uw8Fiw3kWtbj.jpg"
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
                    <v-card width="250" elevation="24">
                        <v-img
                            lazy-src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124845-7dRs0HgkFWgk.jpg"
                            src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124845-7dRs0HgkFWgk.jpg"
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
                    <h2 class="mb-10 text-h4">Wonder egg priority</h2>
                    <p class="subtitle-1">
                        This is the story of Ai, an introverted girl whose fate
                        is forever changed when she acquires a mysterious
                        “Wonder Egg” from a deserted arcade. That night, her
                        dreams blend into reality, and as other girls obtain
                        their own Wonder Eggs, Ai discovers new friends—and the
                        magic within herself.
                    </p>
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
                    />
                </v-col>
            </v-row>
            <v-row class="mb-10">
                <section-header
                    icon="mdi-youtube"
                    title="Trailer"
                    justify="start"
                />
                <v-col cols="12">
                    <iframe
                        id="ytplayer"
                        type="text/html"
                        height="190"
                        src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0"
                        frameborder="0"
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
import MediaGrid from "../components/MediaGrid.vue";
import SectionHeader from "../components/SectionHeader.vue";
export default {
    components: {
        MediaGrid,
        SectionHeader,
        EpisodeCard,
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
        };
    },
};
</script>
