<template>
    <div>
        <v-container>
            <v-row v-if="loading">
                <v-col v-for="card in limit" :key="card" cols="6" sm="3" md="2">
                    <v-skeleton-loader
                        type="card"
                        elevation="24"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col
                    v-for="(mediaItem, index) in media"
                    :key="index"
                    cols="6"
                    sm="3"
                    md="2"
                >
                    <media-card
                        v-if="charactersGrid"
                        :title="
                            `${mediaItem.name.first} ${mediaItem.name.last}`
                        "
                        mediaType="Character"
                        :mediaId="1"
                        :image="mediaItem.image.medium"
                        :imageLQ="mediaItem.image.medium"
                    />
                    <media-card
                        v-else
                        title="Attack on Titan"
                        mediaType="TV SHOW"
                        :mediaId="1"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MediaCard from "./MediaCard";
export default {
    components: {
        MediaCard,
    },
    props: {
        media: {
            type: Object,
        },
        loading: {
            type: Boolean,
            default: true,
        },
        limit: {
            // ! DEV PROP; REMOVE LATER
            //* Possible props: 50 (for global section | favorites) / 6 (for trending section)
            type: Number,
            default: 50,
        },
        charactersGrid: {
            type: Boolean,
            default: false,
        },
        gridType: {
            type: String,
            default: "media",
        },
    },
    methods: {},
    // watch: {
    //     "$route.params": {
    //         handler() {
    //             this.fetchMedia();
    //         },
    //         immediate: true,
    //     },
    // },
};
</script>

<style lang="scss">
.v-skeleton-loader__image {
    height: 260 !important;
}
</style>
