<template>
    <div class="d-flex flex-column mt-2">
        <center>
            <p class="text--disabled capitalize mb-1">
                {{ type }}, {{ media.startDate.year }}
            </p>
            <p class="text--disabled capitalize mb-1">{{ status }}</p>
            <div v-if="media.type === 'ANIME'">
                <p class="text--disabled">
                    {{ totalEpisodes }} {{ formatEpisodesWord }}
                </p>
            </div>
            <div v-else-if="media.chapters">
                <p class="text--disabled">{{ media.chapters }} chapters</p>
            </div>
        </center>
    </div>
</template>

<script>
export default {
    props: {
        media: {
            type: Object,
            required: true,
        },
    },
    computed: {
        totalEpisodes() {
            return this.media.episodes ? this.media.episodes : "???";
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
