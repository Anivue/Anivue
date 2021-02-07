<template>
    <v-col
        md="9"
        class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
    >
        <h2 class="mb-10 text-h4">{{ title }}</h2>

        <p class="subtitle-1 text--secondary" v-html="media.description"></p>
        <genre-chips v-if="mediaType !== 'characters'" :genres="media.genres" />
    </v-col>
</template>

<script>
import GenreChips from "../components/GenreChips";
export default {
    components: {
        GenreChips,
    },
    props: {
        media: {
            type: Object,
            required: true,
        },
        mediaType: {
            type: String,
            required: true,
        },
    },
    computed: {
        title() {
            console.log(this.media);
            if (this.mediaType !== "characters") {
                if (this.media.title.english) {
                    return this.media.title.english;
                } else {
                    return this.media.title.romaji;
                }
            } else {
                return Object.values(this.media.name).join(" ");
            }
        },
    },
};
</script>
