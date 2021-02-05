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
                        v-if="mediaType === 'characters'"
                        :title="characterFullName(mediaItem.name)"
                        subtitle="Character"
                        :mediaId="1"
                        :image="mediaItem.image.medium"
                        :imageLQ="mediaItem.image.medium"
                    />
                    <media-card
                        v-else
                        :title="getTitle(mediaItem.title)"
                        :subtitle="beatifyMediaFormat(mediaItem.format)"
                        :mediaId="mediaItem.id"
                        :image="mediaItem.coverImage.large"
                        :imageLQ="mediaItem.coverImage.medium"
                        :mediaType="mediaType"
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
        mediaType: {
            type: String,
            default: "anime",
        },
    },
    methods: {
        characterFullName(nameObj) {
            return `${nameObj.first || ""} ${nameObj.last || ""}`;
        },
        getTitle(titleObj) {
            if (titleObj.english) {
                return this.trimTitle(titleObj.english);
            } else {
                return this.trimTitle(titleObj.romaji);
            }
        },
        trimTitle(title) {
            if (title.length > 17) {
                return `${title.slice(0, 17)}...`;
            } else {
                return title;
            }
        },
        beatifyMediaFormat(format) {
            return format.split("_").join(" ");
        },
    },
};
</script>

<style lang="scss">
.v-skeleton-loader__image {
    height: 260 !important;
}
</style>
