<template>
    <div>
        <v-img
            v-if="media.bannerImage"
            class="mb-5"
            :lazy-src="media.bannerImage"
            :src="media.bannerImage"
            height="260"
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
                                :lazy-src="media.coverImage.medium"
                                :src="media.coverImage.large"
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
                        <div class="d-flex flex-column my-5">
                            <media-rating :score="media.averageScore" />
                            <media-duration :media="media" />
                        </div>
                    </div>
                </v-col>
                <v-col
                    md="9"
                    class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
                >
                    <h2 class="mb-10 text-h4">{{ title }}</h2>

                    <p
                        class="subtitle-1 text--secondary"
                        v-html="media.description"
                    ></p>
                    <genre-chips :genres="media.genres" />
                </v-col>
            </v-row>

            <media-tabs :media="media" :loading="loading" />
        </v-container>
    </div>
</template>

<script>
import GenreChips from "../components/GenreChips.vue";
import MediaRating from "../components/MediaRating.vue";
import MediaTabs from "../components/MediaTabs";
import MediaDuration from "../components/MediaDuration";
import { getMediaById } from "../utils/APIutils/Anime";
export default {
    components: {
        MediaTabs,
        GenreChips,
        MediaRating,
        MediaDuration,
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
            media: {},
            tab: null,
            type: this.$route.params.type,
        };
    },
    computed: {
        title() {
            if (this.media.title.english) {
                return this.media.title.english;
            } else {
                return this.media.title.romaji;
            }
        },
    },
    created() {
        this.loading = true;
        getMediaById(this.type, this.id)
            .then(media => {
                this.media = media.Media;
                this.loading = false;
                console.log(this.media);
            })
            .catch(err => {
                console.log(err);
            });
    },
};
</script>
