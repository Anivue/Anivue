<template>
    <v-container fluid class="mb-0 pa-0">
        <v-row class="mb-0">
            <v-img
                :src="user.bannerImage"
                class="bannerDiv d-flex align-end"
                :aspect-ratio="1265 / 266"
                :gradient="gradient"
                height="300"
            >
                <v-col class="pa-0">
                    <v-card
                        tile
                        class="d-flex justify-start transparent elevation-0 px-10"
                    >
                        <v-avatar tile size="150">
                            <v-img :src="user.avatar.large"></v-img>
                        </v-avatar>
                        <div class="d-flex align-end justify-center">
                            <h3 class="white--text  text-md-h2 text-h5">
                                {{ user.name }}
                            </h3>
                        </div>
                    </v-card>
                </v-col>
            </v-img>
        </v-row>
        <v-row class="mt-0">
            <v-col class="pt-0">
                <v-tabs
                    show-arrows
                    v-model="tab"
                    background-color="transparent"
                    grow
                >
                    <v-tab href="#anime-list">
                        Anime List
                    </v-tab>
                    <v-tab href="#manga-list">
                        Manga List
                    </v-tab>
                    <v-tab href="#favorites">
                        Favorites
                    </v-tab>
                    <v-tab href="#settings">
                        Settings
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="px-10 pt-8">
                <v-tabs-items mandatory v-model="tab" class="transparent">
                    <!-- ANIME LIST TAB -->
                    <v-tab-item :transition="false" value="anime-list">
                        <media-list type="anime" />
                    </v-tab-item>

                    <!-- MANGA LIST TAB -->
                    <v-tab-item :transition="false" value="manga-list">
                        <media-list type="manga" />
                    </v-tab-item>

                    <!-- FAVORITES LIST TAB -->
                    <v-tab-item :transition="false" value="favorites">
                        <media-list type="favorites" />
                    </v-tab-item>

                    <!-- SETTINGS TAB -->
                    <v-tab-item :transition="false" value="settings">
                        <settings />
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaList from "./MediaList";
import Settings from "./Settings";
export default {
    components: {
        MediaList,
        Settings,
    },
    data() {
        return {
            user: this.$store.state.user.data,
            tab: null,
        };
    },
    computed: {
        gradient() {
            const gradients = this.$store.state.colors.gradient.bannerImage;
            return this.$vuetify.theme.dark ? gradients.dark : gradients.light;
        },
    },
};
</script>

<style lang="scss" scoped>
.bannerDiv {
    width: 100%;
}
</style>
