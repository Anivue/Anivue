<template>
    <div class="mb-10">
        <v-container class="mb-3">
            <v-row justify="space-between">
                <v-col cols="7">
                    <h2>
                        <v-icon :color="colors.block">{{ icon }}</v-icon>
                        <span :class="colors.text"> {{ sectionType }}</span>
                    </h2>
                </v-col>
                <v-col class="d-flex justify-end" cols="4">
                    <v-btn
                        elevation="24"
                        :color="colors.block"
                        :to="{
                            name: 'mediahome',
                            params: { type: sectionType },
                            query: { search: query },
                        }"
                    >
                        See more
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <media-grid :loading="loading" :media="media" :limit="6" :lgCols="2" />
    </div>
</template>

<script>
import MediaGrid from "./MediaGrid";
export default {
    components: {
        MediaGrid,
    },
    props: {
        media: {
            type: [Array, Object, null],
        },
        loading: {
            type: Boolean,
            required: true,
        },
        sectionType: {
            type: String,
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
    },
    computed: {
        colors() {
            return this.$store.state.colors[this.sectionType];
        },
        icon() {
            return this.icons[this.sectionType];
        },
    },
    data() {
        return {
            icons: {
                anime: "mdi-movie-search",
                manga: "mdi-book-search",
                characters: "mdi-account-search",
            },
        };
    },
};
</script>

<style lang="scss" scoped>
h2 {
    text-transform: capitalize;
}
</style>
