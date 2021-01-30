<template>
    <div>
        <div>{{ this.$route.params.type }}</div>
        <v-container>
            <v-row>
                <v-col v-for="n in 6" :key="n" cols="6" xs="4" sm="3" md="2">
                    <media-card />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MediaCard from "../components/MediaCard.vue";
export default {
    components: { MediaCard },
    name: "MediaHome",
};
</script>

<style lang="scss" scoped></style>
