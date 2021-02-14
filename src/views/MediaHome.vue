<template>
    <div v-if="isTypeOk">
        <page-header :title="type" />
        <filter-form :type="mediaType" />
        <media-grid :loading="loading" :limit="limit" :media="media" />
        <div class="text-center" v-if="!loading">
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
import FilterForm from "../components/FilterForm";
import { getMediaPage, getCharactersPage } from "../utils/APIutils/Anime";

export default {
    components: { MediaGrid, PageHeader, FilterForm },
    name: "MediaHome",
    props: ["type", "trending"],
    data() {
        return {
            limit: 50,
            loading: true,
            error: false,
            errorMsg: null,
            media: {},
            page: +this.$route.query.page,
            totalPages: null,
            sort: this.$route.query.sort,
            mediaType: null,
            search: null,
            genre: null,
            isTypeOk: true,
        };
    },
    methods: {
        validateType() {
            const possibleTypes = ["anime", "manga", "characters"];
            const requestedType = this.$route.params.type;
            this.isTypeOk = possibleTypes.includes(requestedType);
            return this.isTypeOk;
        },
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
                        alert(JSON.stringify(err));
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
        setupQueries() {
            this.search = this.$route.query.search;
            this.mediaType = this.$route.params.type;
            this.genre = this.$route.query.genre;

            if (!this.$route.query.page) {
                this.addQuery("page", 1);
                this.page = 1;
            }

            if (this.mediaType !== "characters") {
                if (!this.$route.query.sort) {
                    let sort = "SCORE_DESC";
                    this.addQuery("sort", sort);
                    this.sort = sort;
                } else {
                    this.sort = this.$route.query.sort;
                }
            }
        },
        handleFetch() {
            this.loading = true;
            let vars = { perPage: 50, pageNumber: this.page };
            let options = {};
            // Check if query is empty, if yes then set to first page

            //
            if (this.search) {
                vars.title = this.search;
            }

            if (this.mediaType === "characters") {
                vars.sortBy = "FAVOURITES_DESC";

                options = {
                    isCharacters: true,
                    vars,
                };
                this.handleResponse(getCharactersPage, options);
            } else {
                vars.type = this.type;
                vars.sortBy = this.sort;

                if (this.genre) {
                    vars.genre = this.genre;
                }
                options = {
                    isCharacters: false,
                    vars,
                };

                this.handleResponse(getMediaPage, options);
            }
        },
    },
    // Watch for url query changes. For example, useful when user switches from anime tab to manga tab
    watch: {
        "$route.query": {
            handler() {
                if (this.validateType()) {
                    this.setupQueries();
                    this.handleFetch();
                } else {
                    this.$router.replace({ path: "/404" });
                }
            },
            immediate: true,
        },
    },
};
</script>
