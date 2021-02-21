<template>
    <div class="mb-10">
        <v-container class="mb-3">
            <v-row justify="space-between">
                <v-col cols="8">
                    <h2>
                        <v-icon color="red">mdi-fire</v-icon>
                        <span class="font-weight-light primary--text">
                            Trending
                        </span>
                        <span :class="colors.text">{{ sectionType }}</span>
                    </h2>
                </v-col>
                <v-col class="d-flex justify-end" cols="4">
                    <v-btn
                        class="white--text"
                        elevation="24"
                        :color="colors.block"
                        :to="{
                            name: 'mediahome',
                            params: { type: sectionType },
                            query: { sort: 'TRENDING_DESC' },
                        }"
                    >
                        See more
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <media-grid
            :loading="loading"
            :media="mediaArray"
            :limit="6"
            :lgCols="2"
        />
    </div>
</template>

<script>
import MediaGrid from "./MediaGrid.vue";
import { getMediaPage } from "../utils/APIutils/Anime";
export default {
    components: { MediaGrid },
    props: {
        sectionType: {
            type: String,
            default: "anime",
            required: true,
        },
    },
    computed: {
        colors() {
            return this.$store.state.colors[this.sectionType];
        },
    },
    data() {
        return {
            loading: true,
            mediaArray: [],
            error: false,
            errorMsg: null,
        };
    },
    created() {
        this.loading = true;
        const vars = {
            type: this.sectionType,
            pageNumber: 1,
            perPage: 6,
            sortBy: "TRENDING_DESC",
        };
        getMediaPage(vars)
            .then((res) => {
                if (!res.res.ok) throw Error(res.res.status);
                this.mediaArray = res.data.Page.media;
                this.loading = false;
                this.error = false;
            })
            .catch((err) => {
                this.error = true;
                this.errorMsg = err.message;
            });
    },
};
</script>

<style lang="scss" scoped>
h2 {
    text-transform: capitalize;
}
</style>
