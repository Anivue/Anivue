<template>
    <div>
        <media-grid :mediaType="this.$route.params.type" />
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";

export default {
    components: { MediaGrid },
    name: "MediaHome",
};
</script>

<style lang="scss" scoped></style>
