<template>
    <v-container>
        <v-row>
            <v-col
                v-for="card in limit"
                :key="card"
                cols="6"
                xs="4"
                sm="3"
                md="2"
            >
                <v-skeleton-loader
                    v-if="isLoading"
                    type="card"
                    elevation="24"
                ></v-skeleton-loader>
                <media-card
                    v-else
                    title="Attack on Titan"
                    mediaType="TV SHOW"
                    :mediaId="1"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaCard from "./MediaCard";
export default {
    components: {
        MediaCard,
    },
    props: {
        mediaType: {
            //* Possible props: "anime" / "manga" / "characters"
            type: String,
            default: "anime",
        },
        section: {
            //* Possible props:  "trending" / "global"
            type: String,
            default: "global",
        },
        limit: {
            //* Possible props: 50 (for global section) / 6 (for trending section)
            type: Number,
            default: 50,
        },
    },
    data() {
        return {
            isLoading: true,
        };
    },
};
</script>

<style lang="scss">
.v-skeleton-loader__image {
    height: 260 !important;
}
</style>
