<template>
    <div class="mb-10">
        <v-container>
            <v-row justify="space-between">
                <v-col>
                    <h2>
                        <v-icon color="red">mdi-fire</v-icon> Trending
                        <span :class="colors.text">{{ sectionType }}</span>
                    </h2>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn
                        elevation="24"
                        :color="colors.block"
                        :to="{
                            name: 'trending',
                            params: { type: sectionType, trending: true },
                        }"
                    >
                        See more
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <media-grid
            :loading="loading"
            :media="mediaArray"
            :mediaType="sectionType"
            :limit="6"
        />
    </div>
</template>

<script>
import MediaGrid from "./MediaGrid.vue";
import { getAnimePageByTrending } from "../utils/APIutils/Anime";
export default {
    components: { MediaGrid },
    props: {
        sectionType: {
            type: String,
            default: "anime",
            required: true,
        },
    },
    computed: {
        colors() {
            return this.$store.state.colors[this.sectionType];
        },
    },
    data() {
        return {
            loading: true,
            mediaArray: [],
        };
    },
    created() {
        //! JUST FOR A TESTING PURPOSES, REMOVE THIS "IF" STATEMENT LATER
        if (this.sectionType === "anime") {
            this.loading = true;
            getAnimePageByTrending(1, 6)
                .then(animePage => {
                    this.mediaArray = animePage.Page.media;
                    console.log(this.mediaArray);
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
};
</script>

<style lang="scss" scoped>
h2 {
    text-transform: capitalize;
}
</style>
