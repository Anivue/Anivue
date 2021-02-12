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
        if (+this.score >= 90) {
            this.textColor = "green--text";
        } else if (+this.score >= 70) {
            this.textColor = "light-green--text";
        } else if (+this.score >= 50) {
            this.textColor = "orange--text text--lighten-1";
        } else if (+this.score > 0) {
            this.textColor = "red--text";
        } else {
            this.textColor = "grey--text text-lighten-1";
        }
    },
};
</script>
