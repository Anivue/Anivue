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
            <v-icon :color="emojiColor">
                {{ emoji }}
            </v-icon>
        </div>
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
    data() {
        return {
            emoji: "",
            textColor: "",
            emojiColor: "",
        };
    },
    mounted() {
        if (+this.score > 90) {
            this.emoji = "mdi-robot-love-outline";
            this.textColor = "green--text";
            this.emojiColor = "green";
        } else if (+this.score > 80) {
            this.emoji = "mdi-robot-happy-outline";
            this.textColor = "light-green--text";
            this.emojiColor = "light-green";
        } else if (+this.score > 50) {
            this.emoji = "mdi-robot-outline";
            this.textColor = "orange--text text--lighten-1";
            this.emojiColor = "orange lighten-1";
        } else if (+this.score > 0) {
            this.emoji = "mdi-robot-dead-outline";
            this.textColor = "red--text";
            this.emojiColor = "red";
        } else {
            this.emoji = "mdi-robot-confused-outline";
            this.textColor = "gray--text";
            this.emojiColor = "gray";
        }
    },
};
</script>
