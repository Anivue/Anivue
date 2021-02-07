<template>
    <!-- TODO: add skeleton loader -->
    <div>
        <!-- OK -->
        <div v-if="!error">
            <!-- LOADER -->
            <div v-if="loading">
                loading...
            </div>
            <!-- MEDIA -->
            <div v-else>
                <v-img
                    v-if="bannerImage"
                    class="mb-5 d-none d-md-block"
                    :lazy-src="bannerImage"
                    :src="bannerImage"
                    max-height="360"
                    gradient="0deg, rgba(0,0,0,0.8225490025111607) 0%, rgba(255,255,255,0) 100%"
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
                <v-container>
                    <v-row class="mb-10 elevation-24 pa-4">
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                            class="d-flex justify-center justify-md-start"
                        >
                            <div
                                class="d-flex flex-column"
                                :class="{
                                    'cover-image-column': bannerImage,
                                }"
                            >
                                <v-img
                                    width="250"
                                    max-height="372"
                                    :lazy-src="imageMedium"
                                    :src="imageLarge"
                                    class="elevation-24 rounded-lg"
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
                                <div
                                    class="d-flex flex-column my-5"
                                    v-if="type !== 'characters'"
                                >
                                    <media-rating :score="media.averageScore" />
                                    <media-duration :media="media" />
                                </div>
                            </div>
                        </v-col>
                        <media-description :media="media" :mediaType="type" />
                    </v-row>

                    <media-tabs
                        v-if="type !== 'characters'"
                        :media="media"
                        :loading="loading"
                    />
                </v-container>
            </div>
            <!-- CHARACTER -->
            <!-- <div v-else>
                character!
            </div> -->
        </div>

        <!-- ERROR -->
        <div v-else>
            error!
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
import MediaRating from "../components/MediaRating.vue";
import MediaTabs from "../components/MediaTabs";
import MediaDuration from "../components/MediaDuration";
import MediaDescription from "../components/MediaDescription";
import { getMediaById, getCharacterById } from "../utils/APIutils/Anime";
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
            error: false,
            errorMsg: null,
            tab: null,
            type: this.$route.params.type,
            imageLarge: null,
            imageMedium: null,
            bannerImage: false,
        };
    },
    methods: {
        handleFetch() {
            this.loading = true;
            this.type = this.$route.params.type;
            if (this.type === "characters") {
                getCharacterById(this.id)
                    .then(res => {
                        if (!res.res.ok) throw Error(res.res.status);
                        this.media = res.data.Character;
                        this.imageLarge = this.media.image.large;
                        this.imageMedium = this.media.image.medium;
                        this.bannerImage = false;
                        this.loading = false;
                        console.log(this.media);
                    })
                    .catch(err => {
                        this.error = true;
                        this.errorMsg = err.message;
                        console.log(err);
                    });
            } else {
                getMediaById(this.type, this.id)
                    .then(res => {
                        if (!res.res.ok) throw Error(res.res.status);
                        this.media = res.data.Media;
                        this.imageLarge = this.media.coverImage.extraLarge;
                        this.imageMedium = this.media.coverImage.medium;
                        this.bannerImage = this.media.bannerImage;
                        this.loading = false;
                        this.error = false;
                    })
                    .catch(err => {
                        this.error = true;
                        this.errorMsg = err.message;
                        console.log(err);
                    });
            }
        },
    },

    watch: {
        "$route.params": {
            handler() {
                this.handleFetch();
            },
            immediate: false,
        },
    },

    created() {
        this.handleFetch();
    },
};
</script>

<style lang="scss" scoped>
.cover-image-column {
    position: relative;
    top: -200px;
}

@media screen and (max-width: 960px) {
    .cover-image-column {
        position: inherit;
    }
}
</style>
