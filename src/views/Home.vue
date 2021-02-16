<template>
    <div>
        <!-- Header -->
        <typewriter-header @btnClicked="scrollToContent" />
        <!-- Anime Section -->
        <trending-section sectionType="anime" ref="animeSection" />
        <!-- Manga Section -->
        <trending-section sectionType="manga" />
        <fluid-media-list />
    </div>
</template>

<script>
import TypewriterHeader from "../components/TypewriterHeader";
import TrendingSection from "../components/TrendingSection.vue";
import FluidMediaList from "../components/FluidMediaList";
export default {
    name: "Home",
    components: { TrendingSection, TypewriterHeader, FluidMediaList },
    methods: {
        scrollToContent() {
            this.$refs.animeSection.$el.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        },
    },
};
</script>
