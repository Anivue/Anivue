<template>
    <div>
        Search page
        {{ query }}
    </div>
</template>

<script>
import { getSearchPage } from "../utils/APIutils/Anime";
export default {
    name: "Search",
    data() {
        return {
            query: this.$route.query.search,
            page: 1,
        };
    },
    methods: {
        searchQuery() {
            this.query = this.$route.query.search;
            getSearchPage(this.page, 50, this.query)
                .then(res => {
                    console.log(res);
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

<style lang="scss" scoped></style>
