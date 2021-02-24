<template>
    <div class="d-flex flex-column mt-2">
        <center>
            <p class="text--disabled capitalize mb-1">
                {{ type }}, {{ media.startDate.year }}
            </p>
            <p class="text--disabled capitalize mb-1">{{ status }}</p>
            <div v-if="media.type === 'ANIME' && episodes">
                <p class="text--disabled">
                    {{ episodes }} {{ formatEpisodesWord }}
                </p>
            </div>
            <div v-else-if="chapters">
                <p class="text--disabled">{{ chapters }} chapters</p>
            </div>
            <genre-chips v-if="type !== 'characters'" :genres="media.genres" />
        </center>
    </div>
</template>

<script>
import GenreChips from "./GenreChips";
export default {
    components: {
        GenreChips,
    },
    props: {
        media: {
            type: Object,
            required: true,
        },
    },
    computed: {
        episodes() {
            return this.media.episodes;
        },
        chapters() {
            return this.media.chapters;
        },
        formatEpisodesWord() {
            return this.media.episodes === 1 ? "episode" : "episodes";
        },
        type() {
            return this.media.type.toLowerCase();
        },
        status() {
            return this.media.status
                .toLowerCase()
                .split("_")
                .join(" ");
        },
    },
};
</script>

<style lang="scss" scoped>
.capitalize {
    text-transform: capitalize;
}
</style>
