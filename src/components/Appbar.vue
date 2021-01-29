<template>
    <div>
        <v-app-bar dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>Anibase</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mr-1" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </template>

                <v-card class="pa-1">
                    <v-text-field v-model="searchText"> </v-text-field>
                </v-card>
            </v-dialog>

            <v-btn icon class="mr-1">
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="">
                    <v-list-item
                        v-for="navLink in navLinks"
                        :key="navLink.title"
                        :to="navLink.routePath"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ navLink.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{
                            navLink.title
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            group: null,
            navLinks: this.$store.state.navLinks,
            dialog: false,
            searchText: "",
        };
    },
};
</script>
