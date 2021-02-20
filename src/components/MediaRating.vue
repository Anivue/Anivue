<template>
    <center>
        <v-rating
            color="#fb8c00"
            background-color="grey lighten-1"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            half-increments
            length="5"
            readonly
            :value="formattedScore"
        ></v-rating>
        <div :class="textColor" class="font-weight-medium">
            <div>{{ score ? score : "?" }} / 100</div>
        </div>
    </center>
</template>

<script>
export default {
    props: {
        score: {
            type: null,
            required: true,
        },
    },
    computed: {
        formattedScore() {
            return Math.round(this.score / 20);
        },
    },
    data() {
        return {
            textColor: "",
        };
    },
    mounted() {
        const scoreColors = this.$store.state.score;

        if (+this.score >= scoreColors.super.score) {
            this.textColor = scoreColors.super.text;
        } else if (+this.score >= scoreColors.good.score) {
            this.textColor = scoreColors.good.text;
        } else if (+this.score >= scoreColors.meh.score) {
            this.textColor = scoreColors.meh.text;
        } else if (+this.score > scoreColors.bad.score) {
            this.textColor = "red--text";
        } else {
            this.textColor = scoreColors.none.text;
        }
    },
};
</script>
