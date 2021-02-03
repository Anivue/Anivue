<template>
    <div class="d-flex flex-column my-5">
        <center>
            <div v-if="media.type === 'ANIME'">
                <p class="text--disabled">
                    {{ totalEpisodes }} {{ formatEpisodesWord }}
                    <br />
                    {{ media.duration }} minutes each
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
    },
};
</script>

<style lang="scss" scoped></style>
