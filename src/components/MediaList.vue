<template>
    <div class="mb-5">
        <h1 class="mb-7 font-weight-light text-center primary--text capitalize">
            {{ type }}
        </h1>
        <favorites-grid v-if="type === 'favorites'" />
    </div>
</template>

<script>
import FavoritesGrid from "./grids/FavoritesGrid";
export default {
    components: {
        FavoritesGrid,
    },
    props: {
        type: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.capitalize {
    text-transform: capitalize;
}
</style>
