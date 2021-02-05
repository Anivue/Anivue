<template>
    <!-- TODO: add skeleton loader -->
    <div v-if="!loading">
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
                        <v-img
                            width="250"
                            max-height="372"
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
                        <div class="d-flex flex-column my-5">
                            <media-rating :score="media.averageScore" />
                            <media-duration :media="media" />
                        </div>
                    </div>
                </v-col>
                <media-description :media="media" />
            </v-row>

            <media-tabs :media="media" :loading="loading" />
        </v-container>
    </div>
</template>

<script>
import MediaRating from "../components/MediaRating.vue";
import MediaTabs from "../components/MediaTabs";
import MediaDuration from "../components/MediaDuration";
import MediaDescription from "../components/MediaDescription";
import { getMediaById } from "../utils/APIutils/Anime";
export default {
    components: {
        MediaTabs,
        MediaRating,
        MediaDuration,
        MediaDescription,
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

    created() {
        this.loading = true;
        if (this.type === "characters") {
            console.log("CHARACTERS PAGE REQUESTED");
        } else {
            getMediaById(this.type, this.id)
                .then(media => {
                    this.media = media.Media;
                    this.loading = false;
                    // ! REMOVE THIS LOG LATER
                    console.log(this.media);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
};
</script>
