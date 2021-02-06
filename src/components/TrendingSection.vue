<template>
    <div class="mb-10">
        <v-container>
            <v-row justify="space-between">
                <v-col>
                    <h2>
                        <v-icon color="red">mdi-fire</v-icon> Trending
                        <span :class="colors.text">{{ sectionType }}</span>
                    </h2>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn
                        elevation="24"
                        :color="colors.block"
                        :to="{
                            name: 'mediahome',
                            params: { type: sectionType },
                            query: { trending: 1 },
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
            :mediaType="sectionType"
            :limit="6"
        />
    </div>
</template>

<script>
import MediaGrid from "./MediaGrid.vue";
import { getMediaPageByTrending } from "../utils/APIutils/Anime";
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
        getMediaPageByTrending(this.sectionType, 1, 6)
            .then(res => {
                console.log(res);
                if (!res.res.ok) throw Error(res.res.status);
                this.mediaArray = res.data.Page.media;
                this.loading = false;
                this.error = false;
            })
            .catch(err => {
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
