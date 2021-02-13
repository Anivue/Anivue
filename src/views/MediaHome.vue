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
        <media-grid :loading="loading" :limit="limit" :media="media" />
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
import { getMediaPage, getCharactersPage } from "../utils/APIutils/Anime";

// this.handleResponse(getMediaPageByBest);

export default {
    components: { MediaGrid, PageHeader },
    name: "MediaHome",
    props: ["type", "trending"],
    computed: {
        slogan() {
            if (this.$route.query.trending === "1") {
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
            error: false,
            errorMsg: null,
            media: {},
            page: +this.$route.query.page,
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
            this.addQuery("page", this.page);
            this.handleFetch();
        },
        // Invoke callback promise, then append response to data
        handleResponse(callback, options) {
            if (options.isCharacters) {
                callback(options.vars)
                    .then(res => {
                        if (!res.res.ok) throw Error(res.res.status);
                        this.media = res.data.Page.characters;
                        this.totalPages = Math.ceil(
                            res.data.Page.pageInfo.total / 50
                        );
                        this.loading = false;
                        this.error = false;
                    })
                    .catch(err => {
                        this.error = true;
                        this.errorMsg = err.message;
                        console.log(err);
                    });
            } else {
                callback(options.vars)
                    .then(res => {
                        if (!res.res.ok) throw Error(res.res.status);
                        this.media = res.data.Page.media;
                        this.totalPages = Math.ceil(
                            res.data.Page.pageInfo.total / 50
                        );
                        this.loading = false;
                        this.error = false;
                    })
                    .catch(err => {
                        this.error = true;
                        this.errorMsg = err.message;
                        console.log(err);
                    });
            }
        },
        handleFetch() {
            this.loading = true;
            let vars = {};
            let options = {};
            // Check if query is empty, if yes then set to first page
            if (!this.$route.query.page) {
                this.addQuery("page", 1);
                this.page = 1;
            }
            //
            if (this.$route.query.trending === "1") {
                vars = {
                    pageNumber: this.page,
                    perPage: 50,
                    type: this.type,
                    sortBy: "TRENDING_DESC",
                };
                options = {
                    isCharacters: false,
                    vars,
                };
                this.handleResponse(getMediaPage, options);
            } else if (this.$route.params.type === "characters") {
                if (this.$route.query.search) {
                    vars = {
                        title: this.$route.query.search,
                        pageNumber: this.page,
                        perPage: 50,
                        sortBy: "FAVOURITES_DESC",
                    };
                } else {
                    vars = {
                        pageNumber: this.page,
                        perPage: 50,
                        sortBy: "FAVOURITES_DESC",
                    };
                }
                options = {
                    isCharacters: true,
                    vars,
                };
                this.handleResponse(getCharactersPage, options);
            } else {
                if (this.$route.query.search) {
                    vars = {
                        pageNumber: this.page,
                        perPage: 50,
                        type: this.type,
                        title: this.$route.query.search,
                        sortBy: "FAVOURITES_DESC",
                    };
                } else {
                    vars = {
                        type: this.type,
                        pageNumber: this.page,
                        perPage: 50,
                        sortBy: "FAVOURITES_DESC",
                    };
                }
                options = {
                    isCharacters: false,
                    vars,
                };
                this.handleResponse(getMediaPage, options);
            }
        },
    },
    // Watch for url param changes. For example, useful when user switches from anime tab to manga tab
    watch: {
        "$route.params": {
            handler() {
                this.handleFetch();
            },
            immediate: true,
        },
    },
};
</script>
