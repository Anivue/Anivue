<template>
    <v-form @submit.prevent="">
        <v-container>
            <v-row>
                <v-col :cols="type === 'characters' ? 12 : 4">
                    <v-text-field
                        v-model="search"
                        solo
                        label="Title"
                        @change="applyFilter"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="4" v-if="type !== 'characters'">
                    <v-select
                        solo
                        :items="genres"
                        label="Genres"
                        v-model="selectedGenre"
                        @change="applyFilter"
                    >
                    </v-select>
                </v-col>
                <v-col cols="4" v-if="type !== 'characters'">
                    <v-select
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
            search: undefined,
            genres: [
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Ecchi",
                "Fantasy",
                "Hentai",
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
            sort: ["Trending", "Score", "Favourites"],
            sortQueries: {
                Trending: "TRENDING_DESC",
                Score: "SCORE_DESC",
                Favourites: "FAVOURITES_DESC",
            },
        };
    },
    methods: {
        applyFilter() {
            let filters = {};

            if (this.type === "characters") {
                filters = {
                    search: this.search,
                };
            } else {
                filters = {
                    genre: this.selectedGenre,
                    sort: this.sortQueries[this.selectedSort],
                    search: this.search,
                };
            }
            filters = Object.fromEntries(
                // eslint-disable-next-line no-unused-vars
                Object.entries(filters).filter(([_, v]) => !!v)
            );

            this.$router
                .replace({
                    query: Object.assign({}, this.$route.query, filters),
                })
                .catch(e => e);

            // this.$emit("filterSelected", filters);
        },
    },
    watch: {
        "$route.params.type": {
            handler() {
                this.search = undefined;
                this.selectedGenre = undefined;
                this.selectedSort = undefined;
            },
        },
    },
};
</script>
