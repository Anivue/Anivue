<template>
    <v-card elevation="24" height="100%" class="" @click="openMedia">
        <v-img :lazy-src="imageLQ" :src="image" height="250">
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <v-card-title class="break-word">
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "NoTitle",
        },
        subtitle: {
            // CHARACTER / TV SHOW / OVA / etc...
            type: String,
            required: true,
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
    },
    methods: {
        openMedia() {
            this.$router.push({
                name: "mediafullpage",
                params: { type: this.mediaType, id: this.mediaId },
            });
        },
    },
};
</script>

<style lang="scss">
.break-word {
    word-break: break-word;
}
</style>
