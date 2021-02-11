<template>
    <v-hover v-slot="{ hover }">
        <v-card height="100%" color="transparent" elevation="0" class="pointer">
            <center>
                <v-img
                    :lazy-src="imageLQ"
                    ref="cardImg"
                    :src="image"
                    max-height="400"
                    max-width="240"
                    :aspect-ratio="150 / 250"
                    class="elevation-24 rounded"
                    @click="openMedia"
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
                    @click="openMedia"
                    class="break-word text-subtitle-1 bold-title font-weight-regular d-inline-block text-truncate px-0 pt-5 text-center"
                    :style="[hover ? { color, maxWidth } : { maxWidth }]"
                >
                    {{ title }}
                </v-card-title>
            </center>
        </v-card>
    </v-hover>
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
            default: "#fff",
        },
    },
    methods: {
        openMedia() {
            this.$router.push({
                name: "mediafullpage",
                params: { type: this.mediaType, id: this.mediaId },
            });
        },
        trimTitle() {
            this.maxWidth = `${this.$refs.cardImg.$el.offsetWidth - 30}px`;
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
            maxWidth: "170px",
        };
    },
};
</script>

<style lang="scss">
.break-word {
    word-break: break-word;
}

.pointer {
    cursor: pointer;
}
</style>
