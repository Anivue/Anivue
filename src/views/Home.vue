<template>
    <div>
        <!-- Header -->
        <typewriter-header />
        <!-- Anime Section -->
        <trending-section sectionType="anime" />
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
};
</script>
