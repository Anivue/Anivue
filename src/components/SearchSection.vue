<template>
    <div class="mb-10">
        <v-container>
            <v-row justify="space-between">
                <v-col cols="8">
                    <h2>
                        <v-icon :color="colors.block">mdi-magnify</v-icon>
                        <span :class="colors.text"> {{ sectionType }}</span>
                    </h2>
                </v-col>
                <v-col class="d-flex justify-end" cols="4">
                    <v-btn
                        elevation="24"
                        :color="colors.block"
                        :to="{
                            name: 'mediahome',
                            params: { type: sectionType },
                            query: { search: query },
                        }"
                    >
                        See more
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <media-grid :loading="loading" :media="media" :limit="6" />
    </div>
</template>

<script>
import MediaGrid from "./MediaGrid";
export default {
    components: {
        MediaGrid,
    },
    props: {
        media: {
            type: [Array, Object],
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
        sectionType: {
            type: String,
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
    },
    computed: {
        colors() {
            return this.$store.state.colors[this.sectionType];
        },
    },
};
</script>

<style lang="scss" scoped>
h2 {
    text-transform: capitalize;
}
</style>
