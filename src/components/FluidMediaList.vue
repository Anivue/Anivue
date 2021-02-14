<template>
    <v-container>
        <v-row>
            <v-col>
                <h5 class="text-h4 text-center mb-10">Top 10 Anime</h5>
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
