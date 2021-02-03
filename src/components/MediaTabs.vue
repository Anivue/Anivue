<template>
    <div>
        <v-tabs
            grow
            v-model="tab"
            class="elevation-24"
            :color="media.coverImage.color"
        >
            <v-tab href="#characters-tab">Characters</v-tab>
            <v-tab href="#episodes-tab">Episodes</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="elevation-24">
            <v-tab-item :transition="false" value="characters-tab">
                <v-row class="ma-md-3 my-1">
                    <v-col cols="12">
                        <media-grid
                            :charactersGrid="true"
                            :loading="loading"
                            :media="media.characters.nodes"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item :transition="false" value="episodes-tab">
                <v-row class="ma-3">
                    <!-- IF statement is not working, fix later! -->
                    <v-col
                        cols="6"
                        sm="4"
                        v-for="(episode, index) in episodes"
                        :key="index"
                    >
                        <episode-card
                            :title="episode.title"
                            :thumbnail="episode.thumbnail"
                            :url="episode.url"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";
import EpisodeCard from "../components/EpisodeCard.vue";
export default {
    props: {
        media: {
            type: Object,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        MediaGrid,
        EpisodeCard,
    },
    data() {
        return {
            tab: null,
            episodes: this.media.streamingEpisodes,
        };
    },
};
</script>
