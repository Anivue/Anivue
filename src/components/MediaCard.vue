<template>
    <v-card class="mx-auto transparent" width="185px" elevation="0">
        <v-img
            class="rounded"
            height="265px"
            :lazy-src="coverImageLow"
            :src="coverImage"
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
        <!-- <v-card-title
            class="justify-start px-0 py-1 grey--text text--lighten-4 text-subtitle-1"
            >{{ title }}</v-card-title
        > -->
        <span
            class="d-inline-block text-truncate px-0 py-1 grey--text text--lighten-4"
            style="max-width: 150px;"
        >
            {{ title }}
        </span>
    </v-card>
</template>

<script>
export default {
    props: {
        anime: {
            type: Object,
            // default:
        },
    },
    data() {
        return {
            title: this.anime.title.romaji,
            coverImage: this.anime.coverImage.large,
            coverImageLow: this.anime.coverImage.medium,
        };
    },
    mounted() {
        // console.log(this.anime);
    },
};
</script>

<style lang="scss" scoped></style>
