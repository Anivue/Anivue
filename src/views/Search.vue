<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="d-flex justify-center align-center my-10">
                    <h1 class="font-weight-light text-center">
                        <div v-if="loading">
                            Searching...
                        </div>
                        <div v-else>
                            {{ foundTotal }}
                            {{ foundTotal === 1 ? "Result" : "Results" }} for
                            <span
                                class="orange--text capitalize font-weight-bold"
                                >{{ query }}</span
                            >
                        </div>
                    </h1>
                </v-col>
            </v-row>
        </v-container>
        <div>
            <search-section
                v-if="anime.found"
                :loading="loading"
                :media="anime.data"
                :query="query"
                sectionType="anime"
            />
            <search-section
                v-if="manga.found"
                :loading="loading"
                :media="manga.data"
                :query="query"
                sectionType="manga"
            />
            <search-section
                v-if="characters.found"
                :loading="loading"
                :media="characters.data"
                :query="query"
                sectionType="characters"
            />
        </div>
    </div>
</template>

<script>
import { getSearchPage } from "../utils/APIutils/Anime";
import SearchSection from "../components/SearchSection";
export default {
    name: "Search",
    components: {
        SearchSection,
    },
    data() {
        return {
            query: this.$route.query.search,
            page: 1,
            loading: true,
            anime: { found: true },
            manga: { found: true },
            characters: { found: true },
            foundTotal: 0,
        };
    },
    methods: {
        searchQuery() {
            this.loading = true;
            this.anime = { found: true };
            this.manga = { found: true };
            this.characters = { found: true };

            this.query = this.$route.query.search;
            getSearchPage(this.page, 6, this.query)
                .then(res => {
                    this.anime = res.anime;
                    this.manga = res.manga;
                    this.characters = res.characters;
                    this.loading = false;
                    this.foundTotal = res.counter;
                })
                .catch(err => {
                    console.log(err.message);
                });
        },
    },
    watch: {
        "$route.query": {
            handler() {
                this.searchQuery();
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.capitalize {
    text-transform: capitalize;
}
</style>
