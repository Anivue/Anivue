<template>
    <center>
        <v-rating
            color="warning"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            half-increments
            length="5"
            readonly
            :value="formattedScore"
        ></v-rating>
        <p class="text--disabled">{{ score }} / 100</p>
    </center>
</template>

<script>
export default {
    props: {
        score: {
            type: [Number, String],
            required: true,
        },
    },
    computed: {
        formattedScore() {
            return Math.round(this.score / 20);
        },
    },
};
</script>
