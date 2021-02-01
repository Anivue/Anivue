<template>
    <v-card @click="openEpisode">
        <v-img
            :src="thumbnail"
            height="125"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
            class="white--text align-end"
        >
            <v-card-subtitle>
                {{ title }}
            </v-card-subtitle>
        </v-img>
    </v-card>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        openEpisode() {
            window.open(this.url);
        },
    },
};
</script>
