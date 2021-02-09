<template>
    <v-container fluid>
        <center class="d-block d-md-none">
            <v-chip
                class="ma-2 elevation-5 text--secondary"
                v-for="(genre, index) in genres"
                :key="index"
                >{{ genre }}</v-chip
            >
        </center>
        <div class="d-none d-md-block">
            <v-chip
                class="ma-2 elevation-5 text--secondary"
                v-for="(genre, index) in genres"
                :key="index"
                >{{ genre }}</v-chip
            >
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
};
</script>

<style lang="scss" scoped></style>
