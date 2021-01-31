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
                    <v-btn elevation="24" :color="colors.block">
                        See all
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <media-grid :loading="loading" :limit="6" />
    </div>
</template>

<script>
import MediaGrid from "./MediaGrid.vue";
export default {
    components: { MediaGrid },
    props: {
        sectionType: {
            type: String,
            default: "anime",
            required: true,
        },
        media: {
            type: Object,
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
        };
    },
};
</script>

<style lang="scss" scoped>
h2 {
    text-transform: capitalize;
}
</style>
