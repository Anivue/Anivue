<template>
    <div>
        <page-header :slogan="slogan" :title="type" />
        <media-grid :loading="true" :mediaType="type" :limit="limit" />
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
        };
    },
    methods: {
        loadMore() {
            this.limit += 50;
        },
    },
};
</script>
