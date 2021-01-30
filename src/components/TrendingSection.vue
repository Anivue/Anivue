<template>
    <div class="mb-10">
        <v-container>
            <v-row justify="space-between">
                <v-col>
                    <h2>Trending {{ sectionType }}</h2>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn elevation="24">
                        See all
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <media-grid :mediaType="sectionType" section="trending" :limit="6" />
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
    },
};
</script>

<style lang="scss" scoped></style>
