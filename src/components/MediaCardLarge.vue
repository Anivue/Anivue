<template>
    <v-card elevation="8" class="mediaCard">
        <div class="d-flex">
            <v-img
                @click="openMedia"
                :lazy-src="media.coverImage.medium"
                :src="media.coverImage.extraLarge"
                :aspect-ratio="185 / 265"
                height="265"
                width="185"
                class="align-end flex-grow-0 cursor"
            >
                <v-card-title
                    class="text-subtitle-1 pa-2 flex-column"
                    :style="{ background: 'rgba(36, 36, 36, 0.9)' }"
                >
                    <div class="d-flex flex-column fullWidth">
                        <span class="title subtitle-2 white--text">{{
                            media.startDate.year
                        }}</span>

                        <span
                            v-if="studio"
                            class="caption font-weight-bold"
                            :style="{ color }"
                            >{{ studio }}</span
                        >
                    </div>
                </v-card-title>
            </v-img>
            <div
                class="pa-0 d-flex flex-column justify-space-between flex-grow-1"
            >
                <div class="px-3 pt-3">
                    <!-- Card header -->
                    <div class="d-flex justify-space-between">
                        <div class="">
                            <p class="mb-1 primary--text">
                                {{ title }}
                            </p>
                            <p class="caption text--secondary capitalize">
                                <span>{{ format }}</span
                                >&nbsp;
                                <span>{{ status }}</span>
                            </p>
                        </div>
                        <div>
                            <div class="d-flex justify-center align-center">
                                <div class="mr-2">
                                    <span :class="ratingColorText">
                                        {{ media.averageScore }}
                                    </span>
                                </div>
                                <v-icon :color="ratingColorIcon">
                                    {{ ratingIcon }}
                                </v-icon>
                            </div>
                        </div>
                    </div>
                    <!-- Card description -->
                    <div class="description d-flex">
                        <p
                            class="text--secondary caption"
                            v-html="description"
                        ></p>
                    </div>
                </div>
                <!-- Card genres -->
                <div class="pa-2 genres">
                    <media-card-genres :media="media" />
                </div>
            </div>
        </div>
        <div></div>
    </v-card>
</template>

<script>
import MediaCardGenres from "./MediaCardGenres";
export default {
    components: {
        MediaCardGenres,
    },
    props: {
        media: {
            type: Object,
        },
    },
    data() {
        return {
            ratingIcon: "",
            ratingColorText: "",
            ratingColorIcon: "",
        };
    },
    computed: {
        title() {
            return this.media.title.english || this.media.title.romaji;
        },
        studio() {
            const nodes = this.media.studios.nodes;
            return nodes.length ? nodes[0].name : null;
        },
        color() {
            return this.media.coverImage.color;
        },
        // REMOVE UNNECESSARY NEW LINES, <br> TAGS
        description() {
            const description = this.media.description.replace(/\r?\n|\r/g, "");
            const formatted = description.replace(
                /<br><br \/><br><br \/>/,
                "<br><br>"
            );
            return formatted;
        },
        format() {
            const format = this.media.format;
            return this.capitalize(format);
        },
        status() {
            const status = this.media.status;
            return this.capitalize(status);
        },
    },
    methods: {
        capitalize(string) {
            if (string === "TV") return string;
            const capitalized = string[0] + string.slice(1).toLowerCase();
            return capitalized;
        },
        openMedia() {
            this.$router.push({
                name: "mediafullpage",
                params: {
                    type: this.media.type.toLowerCase(),
                    id: this.media.id,
                },
            });
        },
        getRatingVars() {
            const score = this.media.averageScore;
            const scoreColors = this.$store.state.colors.score;
            let textColor = "";
            let iconColor = "";
            let iconValue = "";
            if (score >= scoreColors.super.score) {
                // Super ratin
                textColor = scoreColors.super.text;
                iconColor = scoreColors.super.icon;
                iconValue = scoreColors.super.iconValue;
            } else if (score >= scoreColors.good.score) {
                // Good rating
                textColor = scoreColors.good.text;
                iconColor = scoreColors.good.icon;
                iconValue = scoreColors.good.iconValue;
            } else if (score >= scoreColors.meh.score) {
                // Meh rating
                textColor = scoreColors.meh.text;
                iconColor = scoreColors.meh.icon;
                iconValue = scoreColors.meh.iconValue;
            } else if (score > scoreColors.bad.score) {
                // Bad rating
                textColor = scoreColors.bad.text;
                iconColor = scoreColors.bad.icon;
                iconValue = scoreColors.bad.iconValue;
            } else {
                // No rating
                textColor = scoreColors.none.text;
                iconColor = scoreColors.none.icon;
                iconValue = scoreColors.none.iconValue;
            }
            return { textColor, iconColor, iconValue };
        },
    },
    mounted() {
        const ratingVars = this.getRatingVars();
        this.ratingIcon = ratingVars.iconValue;
        this.ratingColorText = ratingVars.textColor;
        this.ratingColorIcon = ratingVars.iconColor;
    },
};
</script>

<style lang="scss" scoped>
.fullWidth {
    width: 100%;
}

.mediaCard {
    transition: 0.3s;
    &:hover {
        transform: scale(1.03);
    }
}

.cursor {
    cursor: pointer;
}

.capitalize {
    text-transform: capitalize;
}

.title {
    word-break: break-word;
}

.genres {
    height: 100%;
    display: flex;
    align-items: center;
}

.description {
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    height: 130px;
    overflow-y: scroll;
}
</style>
