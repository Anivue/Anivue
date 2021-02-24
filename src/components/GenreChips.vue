<template>
    <v-container fluid>
        <div>
            <v-chip
                :to="{ name: 'mediahome', params: { type }, query: { genre } }"
                class="ma-2 elevation-2 text--secondary"
                v-for="(genre, index) in genres"
                color="navbar"
                :key="index"
            >
                <span class="white--text">{{ genre }}</span>
            </v-chip>
        </div>
    </v-container>
</template>

<script>
export default {
    props: {
        genres: {
            type: Array,
            required: true,
        },
    },

    computed: {
        type() {
            return this.$route.params.type;
        },
    },
};
</script>
