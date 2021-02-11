<template>
    <div v-if="characters.length || episodes.length || relations.length">
        <v-tabs grow v-model="tab" class="elevation-24 mt-10" :color="color">
            <v-tab href="#characters-tab" v-if="characters.length"
                >Characters</v-tab
            >
            <v-tab href="#episodes-tab" v-if="episodes.length">Episodes</v-tab>
            <v-tab href="#relations-tab" v-if="relations.length">Related</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="elevation-24 rounded-b-xl">
            <v-tab-item
                :transition="false"
                value="characters-tab"
                v-if="characters.length"
            >
                <v-row class="ma-md-3 my-1">
                    <v-col cols="12">
                        <media-grid
                            mediaType="characters"
                            :loading="loading"
                            :media="characters"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item
                :transition="false"
                value="episodes-tab"
                v-if="episodes.length"
            >
                <v-row class="ma-3">
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
            <v-tab-item
                :transition="false"
                value="relations-tab"
                v-if="relations.length"
            >
                <v-row class="ma-md-3 my-1">
                    <v-col cols="12">
                        <media-grid :loading="loading" :media="relations" />
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
            episodes:
                "streamingEpisodes" in this.media
                    ? this.media.streamingEpisodes
                    : "",
            characters:
                "characters" in this.media ? this.media.characters.nodes : "",
            relations:
                "relations" in this.media
                    ? this.media.relations.nodes
                    : this.media.media.nodes,
        };
    },
    computed: {
        color() {
            if ("image" in this.media) {
                return "#fff";
            } else {
                return this.media.coverImage.color;
            }
        },
    },
};
</script>
