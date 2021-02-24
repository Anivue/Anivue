<template>
    <div style="overflow-y: hidden;">
        <!-- OK -->
        <div v-if="!error">
            <!-- LOADER -->
            <div v-if="loading">
                <media-loading />
            </div>
            <!-- MEDIA -->
            <div v-else>
                <v-img
                    v-if="bannerImage"
                    class="mb-0 d-none d-md-block"
                    :lazy-src="
                        `https://via.placeholder.com/24x5/${bannerColor.slice(
                            1,
                            -1
                        )}/fff?text=%20`
                    "
                    :src="bannerImage"
                    :aspect-ratio="1265 / 266"
                    :gradient="gradient"
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
                <v-container fluid>
                    <v-row class="elevation-8 pa-4">
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                            :class="{
                                'cover-image-column-wrapper':
                                    type !== 'characters' && bannerImage,
                            }"
                            class="d-flex justify-center justify-md-start"
                        >
                            <div
                                class="d-flex flex-column fullWidth align-center"
                                :class="{
                                    'cover-image-column': bannerImage,
                                }"
                            >
                                <!-- MEDIA TITLE ON TOP ON SMALL SCREENS -->
                                <media-title :media="media" :mobile="true" />
                                <!-- MEDIA COVER IMAGE -->
                                <v-img
                                    width="250"
                                    max-height="372"
                                    :lazy-src="imageMedium"
                                    :src="imageLarge"
                                    class="elevation-17 rounded-lg"
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
                                <!-- MEDIA INFO (rating; type; etc..) -->
                                <div class="d-flex flex-column mt-5">
                                    <div v-if="type !== 'characters'">
                                        <media-rating
                                            :score="media.averageScore"
                                        />
                                        <media-info :media="media" />
                                    </div>
                                    <div v-else>
                                        <div class="d-flex flex-column mt-2">
                                            <center>
                                                <p
                                                    class="text--disabled capitalize mb-1"
                                                >
                                                    Character
                                                </p>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <media-description :media="media" :mediaType="type" />
                    </v-row>

                    <media-tabs :media="media" :loading="loading" />
                </v-container>
            </div>
        </div>

        <!-- ERROR -->
        <error-fullscreen v-if="error" @tryAgain="handleFetch" />
    </div>
</template>

<script>
import MediaTitle from "../components/MediaTitle";
import ErrorFullscreen from "../components/ErrorFullscreen";
import MediaLoading from "../components/MediaLoading";
import MediaRating from "../components/MediaRating.vue";
import MediaTabs from "../components/MediaTabs";
import MediaInfo from "../components/MediaInfo";
import MediaDescription from "../components/MediaDescription";
import { getMediaById, getCharacterById } from "../utils/APIutils/Anime";
export default {
    name: "MediaFullPage",
    components: {
        MediaTabs,
        MediaRating,
        MediaInfo,
        MediaDescription,
        MediaLoading,
        ErrorFullscreen,
        MediaTitle,
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
            bannerImage: true,
            bannerColor: "fff",
        };
    },
    computed: {
        gradient() {
            const gradients = this.$store.state.colors.gradient.bannerImage;
            return this.$vuetify.theme.dark ? gradients.dark : gradients.light;
        },
    },
    methods: {
        handleFetch() {
            this.loading = true;
            this.type = this.$route.params.type;
            this.error = false;
            if (this.type === "characters") {
                getCharacterById(this.id)
                    .then((res) => {
                        if (!res.res.ok) throw Error(res.res.status);
                        this.media = res.data.Character;
                        this.imageLarge = this.media.image.large;
                        this.imageMedium = this.media.image.medium;
                        this.bannerImage = false;
                        this.loading = false;
                    })
                    .catch((err) => {
                        this.error = true;
                        this.errorMsg = err.message;
                        this.loading = false;
                    });
            } else {
                getMediaById(this.type, this.id)
                    .then((res) => {
                        if (!res.res.ok) throw Error(res.res.status);
                        this.media = res.data.Media;
                        this.imageLarge = this.media.coverImage.extraLarge;
                        this.imageMedium = this.media.coverImage.medium;
                        this.bannerImage = this.media.bannerImage;
                        this.bannerColor =
                            this.media.coverImage.color || "#fff";
                        this.loading = false;
                        this.error = false;
                    })
                    .catch((err) => {
                        this.error = true;
                        this.errorMsg = err.message;
                        this.loading = false;
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
        errorMsg: {
            handler() {
                if (["404", "400"].includes(this.errorMsg)) {
                    this.$router.push({ path: "/404" });
                }
            },
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
    top: calc(-372px / 100 * 50);
}

.cover-image-column-wrapper {
    margin-bottom: calc(-372px / 100 * 50);
}

.fullWidth {
    width: 100%;
}

@media screen and (max-width: 960px) {
    .cover-image-column {
        position: inherit;
    }
    .fullWidth {
        width: auto;
    }

    .cover-image-column-wrapper {
        margin-bottom: 0;
    }
}
</style>
