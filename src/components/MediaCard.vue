<template>
    <v-card
        :ripple="false"
        :to="{
            name: 'mediafullpage',
            params: { type: mediaType, id: mediaId },
        }"
        height="100%"
        color="transparent"
        elevation="0"
        class="pointer mediaCard"
    >
        <center>
            <v-img
                :lazy-src="imageLQ"
                ref="cardImg"
                :src="image"
                max-height="400"
                max-width="240"
                :aspect-ratio="150 / 250"
                class="elevation-12 rounded"
            >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
            <v-card-title
                class="secondary--text break-word text-caption text-sm-subtitle-1 bold-title font-weight-regular d-inline-block text-truncate px-0 pt-2 pt-sm-5 text-center"
                :style="{ 'max-width': maxWidth }"
            >
                <span class="cardTitle">
                    {{ title }}
                </span>
            </v-card-title>
        </center>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "NoTitle",
        },
        mediaId: {
            type: Number,
            default: 0,
            requred: true,
        },
        image: {
            type: String,
            required: true,
        },
        imageLQ: {
            // LOW QUALITY IMAGE FOR LOADER
            type: String,
            required: true,
        },
        mediaType: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    methods: {
        trimTitle() {
            this.maxWidth = `${this.$refs.cardImg.$el.offsetWidth - 15}px`;
        },
    },
    mounted() {
        window.addEventListener("resize", this.trimTitle);
        this.trimTitle();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.trimTitle);
    },
    updated() {
        this.trimTitle();
    },
    data() {
        return {
            maxWidth: "100px",
        };
    },
};
</script>

<style lang="scss" scoped>
.break-word {
    word-break: break-word;
}

.mediaCard {
    transition: 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.9);
    }
}

.cardTitle {
    transition: 0.2s;
}

.pointer {
    cursor: pointer;
}

.custom-gray {
    color: #c9c9c9;
}
</style>
