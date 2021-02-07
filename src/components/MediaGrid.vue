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
                    <!-- <media-card
                        v-if="mediaType === 'characters'"
                        :title="mediaItem.name.full"
                        :mediaId="mediaItem.id"
                        :image="mediaItem.image.medium"
                        :imageLQ="mediaItem.image.medium"
                        :mediaType="mediaType"
                    /> -->
                    <media-card
                        :title="getCardTitle(mediaItem)"
                        :mediaId="mediaItem.id"
                        :image="checkForLarge(mediaItem)"
                        :imageLQ="checkForMedium(mediaItem)"
                        :mediaType="getType(mediaItem)"
                        :color="checkForColor(mediaItem)"
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
            type: [Object, Array],
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
    },
    methods: {
        getTitle(titleObj) {
            return titleObj.english ? titleObj.english : titleObj.romaji;
        },
        beatifyMediaFormat(format) {
            return format.split("_").join(" ");
        },
        getCardTitle(mediaItem) {
            if (this.getType(mediaItem) === "characters") {
                return Object.values(mediaItem.name).join(" ");
            } else {
                return this.getTitle(mediaItem.title);
            }
        },
        checkForLarge(mediaItem) {
            if (this.getType(mediaItem) === "characters") {
                return mediaItem.image.large;
            } else {
                return mediaItem.coverImage.large;
            }
        },
        checkForMedium(mediaItem) {
            if (this.getType(mediaItem) === "characters") {
                return mediaItem.image.medium;
            } else {
                return mediaItem.coverImage.medium;
            }
        },
        checkForColor(mediaItem) {
            if (this.getType(mediaItem) === "characters") {
                return "#fff";
            } else {
                return mediaItem.coverImage.color;
            }
        },
        getType(mediaItem) {
            if ("type" in mediaItem) {
                return mediaItem.type.toLowerCase();
            } else {
                return "characters";
            }
        },
    },
};
</script>

<style lang="scss">
.v-skeleton-loader__image {
    height: 260 !important;
}
</style>
