<template>
    <div class="d-flex my-1 card">
        <div class="mr-5 index d-md-flex d-none justify-center align-center">
            <p class="text-h5 ma-0 pa-0">
                <span class="hashtag">#</span
                ><span class="number">{{ index + 1 }}</span>
            </p>
        </div>
        <v-card class="pa-2 flex-grow-1 d-flex">
            <div
                class="coverImage d-flex justify-center align-center cursor"
                @click="goToMedia"
            >
                <v-img
                    class="mr-2"
                    :aspect-ratio="48 / 60"
                    width="50"
                    height="70"
                    :src="media.coverImage.medium"
                ></v-img>
            </div>
            <div class="mediaInfo pa-2 d-flex justify-space-between">
                <div class="mediaMain d-flex flex-column justify-space-around">
                    <div class="mediaTitle cursor" @click="goToMedia">
                        <span class="d-md-inline d-none font-weight-bold">{{
                            title
                        }}</span>
                        <span class="d-md-none font-weight-bold">{{
                            trimmedTitle
                        }}</span>
                    </div>
                    <div class="mediaGenres d-flex">
                        <v-chip
                            small
                            class="mr-2 font-weight-bold"
                            :color="media.coverImage.color"
                            v-for="(genre, i) in genres"
                            :key="i"
                            :to="{
                                name: 'mediahome',
                                params: { type: media.type.toLowerCase() },
                                query: { genre },
                            }"
                        >
                            <span :style="{ color: genreColor }">
                                {{ genre }}
                            </span>
                        </v-chip>
                    </div>
                </div>
                <div
                    class="mediaRating d-flex flex-column justify-center align-center"
                >
                    <v-icon :color="ratingIconColor">
                        mdi-robot-happy
                    </v-icon>
                    <strong>
                        <span :class="ratingScoreColor">
                            {{ media.averageScore }}
                        </span>
                    </strong>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: [Number, String],
            required: true,
        },
        media: {
            type: Object,
            // required: true
        },
    },
    computed: {
        genres() {
            return this.media.genres.slice(0, 2);
        },
        title() {
            return this.media.title.english || this.media.title.romaji;
        },
        genreColor() {
            return this.getGenreColor();
        },
        ratingIconColor() {
            return this.getRatingColor().iconColor;
        },
        ratingScoreColor() {
            return this.getRatingColor().textColor;
        },
        trimmedTitle() {
            const title = this.title;
            return `${title.slice(0, 22)}${title.length > 22 ? "..." : ""}`;
        },
    },
    methods: {
        goToMedia() {
            const type = this.media.type.toLowerCase();
            const id = this.media.id;
            this.$router.push({ name: "mediafullpage", params: { type, id } });
        },
        getRatingColor() {
            const score = this.media.averageScore;
            let textColor = "";
            let iconColor = "";
            if (score >= 90) {
                textColor = "green--text";
                iconColor = "green";
            } else if (score >= 70) {
                textColor = "light-green--text";
                iconColor = "light-green";
            } else if (score >= 50) {
                textColor = "orange--text text--lighten-1";
                iconColor = "orange lighten-1";
            } else if (score > 0) {
                textColor = "red--text";
                iconColor = "red";
            } else {
                textColor = "grey--text text-lighten-1";
                iconColor = "grey lighten-1";
            }
            return { textColor, iconColor };
        },
        getGenreColor() {
            const hex = this.media.coverImage.color;
            function hex_to_rgb(hex) {
                let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                    hex
                );
                return result
                    ? {
                          r: parseInt(result[1], 16),
                          g: parseInt(result[2], 16),
                          b: parseInt(result[3], 16),
                      }
                    : null;
            }
            function hex_inverse_bw(hex) {
                let rgb = hex_to_rgb(hex);
                let luminance =
                    0.2126 * rgb["r"] + 0.7152 * rgb["g"] + 0.0722 * rgb["b"];
                return luminance < 140 ? "#ffffff" : "#8a2c0f";
            }
            return hex_inverse_bw(hex);
        },
    },
};
</script>

<style lang="scss" scoped>
.index {
    width: 50px;
    height: 100%;
}

.hashtag {
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    font-weight: bold;
}

.number {
    font-weight: bold;
}

.card {
    height: 90px;
}

.mediaInfo {
    // background: orangered;
    height: 100%;
    width: 100%;
}

.mediaMain {
    height: 100%;
}

.cursor {
    cursor: pointer;
}
</style>
