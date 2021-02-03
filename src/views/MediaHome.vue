<template>
    <div>
        <page-header :slogan="slogan" :title="type" />
        <media-grid
            :loading="loading"
            :mediaType="type"
            :limit="limit"
            :media="media"
        />
        <v-container class="my-10">
            <v-row>
                <v-col cols="12">
                    <center>
                        <v-btn
                            :color="this.$store.state.colors[type].block"
                            x-large
                            @click="loadMore"
                            >Load More</v-btn
                        >
                    </center>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";
import PageHeader from "../components/PageHeader.vue";
import { getMediaPageByTrending } from "../utils/APIutils/Anime";
import { getMediaPageByBest } from "../utils/APIutils/Anime";

export default {
    components: { MediaGrid, PageHeader },
    name: "MediaHome",
    props: ["type", "trending"],
    computed: {
        slogan() {
            if (this.trending) {
                return "Trending";
            } else {
                return "Browse";
            }
        },
    },
    data() {
        return {
            limit: 50,
            loading: true,
            media: {},
            page: 1,
        };
    },
    methods: {
        loadMore() {
            this.limit += 50;
        },
        handleFetch() {
            this.loading = true;
            console.log(this.type, this.trending);
            if (this.trending) {
                getMediaPageByTrending(this.type, this.page, 50)
                    .then(mediaPage => {
                        this.media = mediaPage.Page.media;
                        this.loading = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                getMediaPageByBest(this.type, this.page, 50)
                    .then(mediaPage => {
                        this.media = mediaPage.Page.media;
                        this.loading = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    },
    watch: {
        "$route.params": {
            handler() {
                this.handleFetch();
            },
            immediate: true,
        },
    },
    created() {
        this.handleFetch();
    },
};
</script>
