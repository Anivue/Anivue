<template>
    <div>
        <v-form @submit.prevent="fetchAnime">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            color="white"
                            placeholder="Title"
                            v-model="title"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-container>
            <v-row>
                <v-col
                    v-for="anime in animes"
                    :key="anime.id"
                    cols="12"
                    sm="6"
                    md="3"
                >
                    <media-card v-if="isLoaded" :anime="anime" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MediaCard from "./MediaCard.vue";
import {
    getAnimePageByTitle,
    getAnimePageByTrending,
} from "../utils/APIutils/Anime";
export default {
    name: "MediaGrid",
    components: { MediaCard },
    props: {
        mediaType: {
            type: String,
            default: "ANIME",
        },
        sortBy: {
            type: String,
            default: "TRENDING",
        },
        perPage: {
            type: Number,
            default: 25,
        },
    },
    data() {
        return {
            isLoaded: false,
            animes: {},
            title: "",
        };
    },

    methods: {
        search() {
            this.isLoaded = false;
            getAnimePageByTitle(this.title, 1, this.perPage)
                .then(animeObj => {
                    this.animes = animeObj.Page.media;
                    this.isLoaded = true;
                })
                .catch(err => {
                    console.log(err);
                    this.error = err.message;
                });
        },
        trending() {
            this.isLoaded = false;
            getAnimePageByTrending(1, 30).then(animeObj => {
                this.animes = animeObj.Page.media;
                this.isLoaded = true;
            });
        },
        fetchAnime() {
            this.title ? this.search() : this.trending();
        },
    },
    mounted() {
        this.fetchAnime();
    },
};
</script>

<style lang="scss" scoped></style>
