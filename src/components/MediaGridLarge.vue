<template>
    <v-container>
        <v-row v-if="loading">
            <v-col v-for="card in 50" :key="card" cols="6">
                <v-skeleton-loader
                    type="image"
                    :height="265"
                    elevation="24"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col v-for="(mediaObj, index) in media" :key="index" cols="6">
                <media-card-large :media="mediaObj" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaCardLarge from "./MediaCardLarge";
export default {
    components: {
        MediaCardLarge,
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
    },
};
</script>
