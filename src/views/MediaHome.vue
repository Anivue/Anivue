<template>
    <div>
        <page-header :title="type" />
        <media-grid :loading="true" :mediaType="type" />
    </div>
</template>

<script>
import MediaGrid from "../components/MediaGrid.vue";
import PageHeader from "../components/PageHeader.vue";

export default {
    components: { MediaGrid, PageHeader },
    name: "MediaHome",
    props: ["type"],
};
</script>
