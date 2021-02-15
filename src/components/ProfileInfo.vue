<template>
    <v-container fluid class="mb-0 pa-0">
        <v-row class="mb-0">
            <v-img
                :src="user.bannerImage"
                class="bannerDiv d-flex align-end"
                :aspect-ratio="1265 / 266"
                gradient="0deg, rgba(0,0,0,0.8225490025111607) 0%, rgba(255,255,255,0) 100%"
                height="300"
            >
                <v-col class="pa-0">
                    <v-card
                        tile
                        class="d-flex justify-start transparent elevation-0 px-10"
                    >
                        <v-avatar tile size="120">
                            <v-img :src="user.avatar.large"></v-img>
                        </v-avatar>
                        <div class="d-flex align-end justify-center">
                            <h3 class="white--text text-md-h2 text-h5">
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
                    <v-tab-item :transition="false" value="anime-list">
                        <h1 class="font-weight-light text-center">
                            Anime list
                        </h1>
                    </v-tab-item>
                    <v-tab-item :transition="false" value="manga-list">
                        <h1 class="font-weight-light text-center">
                            Manga list
                        </h1>
                    </v-tab-item>
                    <v-tab-item :transition="false" value="favorites">
                        <h1 class="font-weight-light text-center">Favorites</h1>
                    </v-tab-item>
                    <v-tab-item :transition="false" value="settings">
                        <h1 class="font-weight-light text-center">Settings</h1>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            user: this.$store.state.user.data,
            tab: null,
        };
    },
};
</script>

<style lang="scss" scoped>
.bannerDiv {
    width: 100%;
}
</style>
