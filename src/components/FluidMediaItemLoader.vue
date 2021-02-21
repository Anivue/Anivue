<template>
    <div class="d-flex my-5 card">
        <div class="mr-5 index d-md-flex d-none justify-center align-center">
            <p class="text-h5 ma-0 pa-0 nocopy">
                <span class="hashtag secondary--text">#</span
                ><span class="number primary--text">{{ index + 1 }}</span>
            </p>
        </div>
        <div class="flex-grow-1 d-flex">
            <v-skeleton-loader type="image" style="width: 100%; height: 100%">
            </v-skeleton-loader>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.card {
    height: 90px;
}

.index {
    width: 50px;
    height: 100%;
}

.hashtag {
    font-size: 18px;
    font-weight: bold;
}

.number {
    font-weight: bold;
}
</style>
