<template>
    <v-form @submit.prevent="">
        <v-container>
            <v-row class="mb-5">
                <v-col cols="12" md="4">
                    <v-text-field
                        flat
                        :class="{ 'elevation-4': md }"
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        maxlength="20"
                        ref="textField"
                        clearable
                        v-model="search"
                        solo
                        autocomplete="off"
                        label="Search..."
                        @change="applyFilter"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="6" md="4" v-if="type !== 'characters'">
                    <v-select
                        hide-details
                        flat
                        :class="{ 'elevation-4': md }"
                        prepend-inner-icon="mdi-drama-masks"
                        solo
                        :items="genres"
                        label="Genres"
                        v-model="selectedGenre"
                        @change="applyFilter"
                    >
                    </v-select>
                </v-col>
                <v-col cols="6" md="4" v-if="type !== 'characters'">
                    <v-select
                        hide-details
                        flat
                        :class="{ 'elevation-4': md }"
                        prepend-inner-icon="mdi-sort"
                        solo
                        :items="sort"
                        label="Sort"
                        v-model="selectedSort"
                        @change="applyFilter"
                    >
                    </v-select>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            selectedGenre: undefined,
            selectedSort: undefined,
            search: "",
            genres: [
                "Any",
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Ecchi",
                "Fantasy",
                "Horror",
                "Mahou Shoujo",
                "Mecha",
                "Music",
                "Mystery",
                "Psychological",
                "Romance",
                "Sci-Fi",
                "Slice of Life",
                "Sports",
                "Supernatural",
                "Thriller",
            ],
            sort: ["Trending", "Score", "Favourites", "Popularity"],
            sortQueries: {
                Trending: "TRENDING_DESC",
                Score: "SCORE_DESC",
                Favourites: "FAVOURITES_DESC",
                Popularity: "POPULARITY_DESC",
            },
            md: window.innerWidth >= 960,
        };
    },
    methods: {
        getKeyByValue(object, value) {
            return Object.keys(object).find((key) => object[key] === value);
        },
        filtersPreset() {
            // Grab queries from url and apply them to input fields values
            this.search = this.$route.query.search || "";
            this.selectedSort =
                this.getKeyByValue(this.sortQueries, this.$route.query.sort) ||
                undefined;
            this.selectedGenre = this.$route.query.genre || "Any";
        },
        applyFilter() {
            let filters = {};

            if (this.type === "characters") {
                filters = {
                    search: this.search,
                };
            } else {
                filters = {
                    genre:
                        this.selectedGenre === "Any" ? "" : this.selectedGenre,
                    sort: this.sortQueries[this.selectedSort],
                    search: this.search,
                };
            }

            // HIDE SCREEN KEYBOARD AFTER FILTER APPLIED
            const input = this.$refs.textField.$el.children[0].children[0]
                .children[0].children[0];
            input.blur();

            this.$router
                .replace({
                    query: Object.assign({}, this.$route.query, filters),
                })
                .catch((e) => e);
        },
        setMd() {
            this.md = window.innerWidth >= 960;
        },
    },
    mounted() {
        window.addEventListener("resize", this.setMd);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setMd);
    },
    watch: {
        "$route.params.type": {
            handler() {
                this.search = "";
                this.selectedGenre = undefined;
                this.selectedSort = undefined;
                this.filtersPreset();
            },
            immediate: true,
        },
        "$route.query": {
            handler() {
                this.filtersPreset();
            },
        },
    },
};
</script>
