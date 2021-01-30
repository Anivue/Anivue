<template>
    <div>
        <v-container class="my-10">
            <v-row>
                <v-col class="d-flex justify-center">
                    <h1>
                        Explore
                        <span
                            :class="
                                this.$store.state.colors[
                                    this.$route.params.type
                                ].text
                            "
                            >{{ this.$route.params.type }}</span
                        >
                    </h1>
                </v-col>
            </v-row>
        </v-container>
        <media-grid v-if="isFetched" :mediaType="this.$route.params.type" />
        <media-grid v-else :skeleton="true" :limit="12"></media-grid>
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";

export default {
    components: { MediaGrid },
    name: "MediaHome",
    data() {
        return {
            isFetched: false,
            type: null,
        };
    },
};
</script>

<style lang="scss" scoped>
h1 {
    text-transform: capitalize;
}
</style>
