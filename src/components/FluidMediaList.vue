<template>
    <v-container>
        <v-row>
            <v-col class="text-center mb-6">
                <h5 class="text-h4 mb-3 font-weight-light">
                    Top 10
                    <span :class="colors['anime'].text" class="font-weight-bold"
                        >Anime</span
                    >
                </h5>
                <p class="text-subtitle text--secondary">
                    Based on users rating
                </p>
            </v-col>
            <v-col cols="12" v-for="(anime, i) in media" :key="i">
                <fluid-media-item :index="i" :media="anime" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FluidMediaItem from "./FluidMediaItem.vue";
import { getMediaPage } from "../utils/APIutils/Anime";
export default {
    components: {
        FluidMediaItem,
    },
    data() {
        return {
            media: {},
            colors: this.$store.state.colors,
        };
    },
    mounted() {
        const variables = {
            sortBy: "SCORE_DESC",
            type: "ANIME",
            pageNumber: 1,
            perPage: 10,
        };
        getMediaPage(variables)
            .then(res => {
                this.media = res.data.Page.media;
            })
            .catch(e => {
                console.log(e);
            });
    },
};
</script>
