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
