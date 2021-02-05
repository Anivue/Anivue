<template>
    <div>
        <page-header :slogan="slogan" :title="type" />
        <div class="text-center">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-container class="max-width">
                            <v-pagination
                                @input="changePage"
                                v-model="page"
                                class="mb-4"
                                :length="totalPages"
                                :total-visible="5"
                                :color="this.$store.state.colors[type].block"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <media-grid
            :loading="loading"
            :mediaType="type"
            :limit="limit"
            :media="media"
        />
        <div class="text-center">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-container class="max-width">
                            <v-pagination
                                @input="changePage"
                                v-model="page"
                                class="my-4"
                                :length="totalPages"
                                :total-visible="5"
                                :color="this.$store.state.colors[type].block"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";
import PageHeader from "../components/PageHeader.vue";
import {
    getMediaPageByTrending,
    getMediaPageByBest,
    getCharactersPageByFav,
} from "../utils/APIutils/Anime";

// this.handleResponse(getMediaPageByBest);

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
            page: +this.$route.query.p,
            totalPages: null,
        };
    },
    methods: {
        // Adds ?query to url
        addQuery(queryName, queryValue) {
            this.$router.push({
                query: Object.assign({}, this.$route.query, {
                    [queryName]: queryValue,
                }),
            });
        },
        changePage() {
            this.addQuery("p", this.page);
            this.handleFetch();
        },
        // Invoke callback promise, then append response to data
        handleResponse(callback, isCharacters = false) {
            if (isCharacters) {
                callback(this.page, 50)
                    .then(charactersPage => {
                        this.media = charactersPage.Page.characters;
                        this.totalPages = Math.ceil(
                            charactersPage.Page.pageInfo.total / 50
                        );
                        this.loading = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                callback(this.type, this.page, 50)
                    .then(mediaPage => {
                        this.media = mediaPage.Page.media;
                        this.totalPages = Math.ceil(
                            mediaPage.Page.pageInfo.total / 50
                        );
                        this.loading = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        handleFetch() {
            this.loading = true;
            // Check if query is empty, if yes then set to first page
            if (!this.$route.query.p) {
                this.addQuery("p", 1);
                this.page = 1;
            }
            //
            if (this.trending) {
                this.handleResponse(getMediaPageByTrending);
            } else if (this.$route.params.type === "characters") {
                this.handleResponse(getCharactersPageByFav, true);
            } else {
                this.handleResponse(getMediaPageByBest);
            }
        },
    },
    // Watch for url param changes. For example, useful when user switches from anime tab to manga tab
    watch: {
        "$route.params": {
            handler() {
                this.handleFetch();
            },
            immediate: false,
        },
    },
    created() {
        this.handleFetch();
    },
};
</script>
