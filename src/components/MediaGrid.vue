<template>
    <div>
        <h1>{{ mediaType }}</h1>
        <v-container>
            <v-row>
                <v-col v-for="n in 6" :key="n" cols="6" xs="4" sm="3" md="2">
                    <media-card />
                </v-col>
            </v-row>
        </v-container>
    </div>
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

<style lang="scss" scoped></style>
