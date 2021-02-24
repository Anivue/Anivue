<template>
    <div class="d-flex my-5 card" ref="mediaCard">
        <div class="mr-5 index d-md-flex d-none justify-center align-center">
            <p class="text-h5 ma-0 pa-0 nocopy">
                <span class="hashtag secondary--text">#</span
                ><span class="number primary--text">{{ index + 1 }}</span>
            </p>
        </div>
        <v-card
            :to="{ name: 'mediafullpage', params: { type, id } }"
            class="pa-2 flex-grow-1 d-flex mediaCard"
            elevation="1"
        >
            <div class="coverImage d-flex justify-center align-center cursor">
                <v-badge
                    :color="media.coverImage.color"
                    left
                    bordered
                    overlap
                    :content="index + 1"
                    :value="showBadge"
                >
                    <v-img
                        class="mr-2"
                        :aspect-ratio="48 / 60"
                        width="50"
                        height="70"
                        :src="media.coverImage.medium"
                    ></v-img>
                </v-badge>
            </div>
            <div class="mediaInfo pa-2 d-flex justify-space-between">
                <div class="mediaMain d-flex flex-column justify-space-around">
                    <div class="mediaTitle cursor primary--text">
                        <span
                            ref="mediaCardTitle"
                            class="cardTitle d-md-inline d-none font-weight-bold"
                            >{{ title }}</span
                        >
                        <span class="d-md-none font-weight-bold">{{
                            trimmedTitle
                        }}</span>
                    </div>
                    <media-card-genres :media="media" />
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
import MediaCardGenres from "./MediaCardGenres";
export default {
    components: {
        MediaCardGenres,
    },
    props: {
        index: {
            type: [Number, String],
            required: true,
        },
        media: {
            type: Object,
            required: true,
        },
    },
    computed: {
        title() {
            return this.media.title.english || this.media.title.romaji;
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
        showBadge() {
            const windowWidth = window.innerWidth;
            return windowWidth <= 600;
        },
        type() {
            return this.media.type.toLowerCase();
        },
        id() {
            return this.media.id;
        },
    },
    methods: {
        getRatingColor() {
            const score = this.media.averageScore;
            const scoreColors = this.$store.state.colors.score;
            let textColor = "";
            let iconColor = "";
            if (score >= scoreColors.super.score) {
                textColor = scoreColors.super.text;
                iconColor = scoreColors.super.icon;
            } else if (score >= scoreColors.good.score) {
                textColor = scoreColors.good.text;
                iconColor = scoreColors.good.icon;
            } else if (score >= scoreColors.meh.score) {
                textColor = scoreColors.meh.text;
                iconColor = scoreColors.meh.icon;
            } else if (score > scoreColors.bad.score) {
                textColor = scoreColors.bad.text;
                iconColor = scoreColors.bad.icon;
            } else {
                textColor = scoreColors.none.text;
                iconColor = scoreColors.none.icon;
            }
            return { textColor, iconColor };
        },
    },
    mounted() {
        this.$refs.mediaCard.addEventListener("mouseenter", () => {
            this.$refs.mediaCardTitle.style.color = this.media.coverImage.color;
        });

        this.$refs.mediaCard.addEventListener("mouseleave", () => {
            this.$refs.mediaCardTitle.style.color = "";
        });
    },
};
</script>

<style lang="scss" scoped>
.nocopy {
    user-select: none;
}

.cardTitle {
    transition: 0.2s;
}

.mediaCard {
    transition: 0.3s;
    &:hover {
        transform: scale(1.02);
    }
}

.index {
    width: 50px;
    height: 100%;
}

.hashtag {
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
