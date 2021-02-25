<template>
    <div class="mb-5">
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
    data() {
        return {
            icons: {
                favorites: "mdi-star",
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.capitalize {
    text-transform: capitalize;
}
</style>
