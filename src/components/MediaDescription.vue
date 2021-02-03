<template>
    <v-col
        md="9"
        class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
    >
        <h2 class="mb-10 text-h4">{{ title }}</h2>

        <p class="subtitle-1 text--secondary" v-html="media.description"></p>
        <genre-chips :genres="media.genres" />
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
    },
    computed: {
        title() {
            if (this.media.title.english) {
                return this.media.title.english;
            } else {
                return this.media.title.romaji;
            }
        },
    },
};
</script>
