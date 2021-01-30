<template>
    <v-container>
        <v-row>
            <v-col
                v-for="card in limit"
                :key="card"
                cols="6"
                xs="4"
                sm="3"
                md="2"
            >
                <media-card
                    title="Attack on Titan"
                    mediaType="TV SHOW"
                    :mediaId="1"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaCard from "./MediaCard";
export default {
    components: {
        MediaCard,
    },
    props: {
        mediaType: {
            //* Possible props: "anime" / "manga" / "characters"
            type: String,
            default: "anime",
            required: true,
        },
        section: {
            //* Possible props:  "trending" / "global"
            type: String,
            default: "global",
        },
        limit: {
            //* Possible props: 50 (for global section) / 6 (for trending section)
            type: Number,
            default: 50,
        },
    },
};
</script>
