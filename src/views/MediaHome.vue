<template>
    <div>
        <page-header :title="this.$route.params.type" />
        <media-grid :mediaType="this.$route.params.type" />
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";
import PageHeader from "../components/PageHeader.vue";

export default {
    components: { MediaGrid, PageHeader },
    name: "MediaHome",
    data() {
        return {
            isFetched: false,
            type: null,
        };
    },
};
</script>
