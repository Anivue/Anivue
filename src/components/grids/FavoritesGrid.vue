<template>
    <v-container>
        <div class="mb-10" v-for="(media, i) in medias" :key="i">
            <div v-if="media.data.length">
                <p class="primary--text text-h6 font-weight-light">
                    {{ media.name }}
                </p>
                <v-row class="accent rounded">
                    <v-col
                        cols="4"
                        sm="2"
                        md="1"
                        v-for="i in media.data.length"
                        :key="i"
                    >
                        <list-card :media="media.data[i - 1]" />
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<script>
import ListCard from "../cards/ListCard";
export default {
    components: {
        ListCard,
    },
    data() {
        return {
            medias: {
                anime: {
                    name: "Anime",
                    data: [],
                },
                manga: {
                    name: "Manga",
                    data: [],
                },
                characters: {
                    name: "Characters",
                    data: [],
                },
            },
        };
    },
    computed: {
        favorites() {
            return this.$store.state.user.data.favourites;
        },
    },
    methods: {
        updateFavs() {
            this.medias.anime.data = this.favorites.anime.nodes;
            this.medias.manga.data = this.favorites.manga.nodes;
            this.medias.characters.data = this.favorites.characters.nodes;
        },
    },
    mounted() {
        this.updateFavs();
    },
    watch: {
        favorites() {
            this.updateFavs();
        },
    },
};
</script>
