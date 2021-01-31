<template>
    <v-card elevation="24">
        <v-img :lazy-src="imageLQ" :src="image">
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ mediaType }}
        </v-card-subtitle>
        <v-card-actions>
            <v-btn block elevation="24" color="grey darken-4">
                Open
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "NoTitle",
        },
        mediaType: {
            // CHARACTER / TV SHOW / OVA / etc...
            type: String,
            default: "TV SHOW",
            required: true,
        },
        mediaId: {
            type: Number,
            default: 0,
            requred: true,
        },
        image: {
            type: String,
            // required: true,
            default:
                "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-m5ZMNtFioc7j.png",
        },
        imageLQ: {
            // LOW QUALITY IMAGE FOR LOADER
            type: String,
            // required: true,
            default: "https://via.placeholder.com/150",
        },
    },
    data() {
        return {};
    },
    // TODO: Fetch data on render; Remove dev props for image prop
};
</script>
