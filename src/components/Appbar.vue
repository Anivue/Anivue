<template>
    <div>
        <v-app-bar dark app hide-on-scroll elevation="24">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title class="font-weight-bold pl-0">
                <v-btn x-large text to="/" exact class="p-0">
                    Anivue
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-dialog
                overlay-opacity="0.8"
                v-model="dialog"
                width="500"
                class="transparent"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mr-1" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </template>

                <v-card class="pa-1">
                    <v-card-actions>
                        <v-text-field
                            spellcheck="false"
                            placeholder="Search..."
                            v-model="searchText"
                            autofocus
                            class="font-weight-bold"
                        >
                        </v-text-field>
                        <v-btn icon large class="ml-2">
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-btn icon class="mr-1">
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            overlay-opacity="0.8"
            app
            v-model="drawer"
            temporary
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Menu
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list nav>
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
            searchPlaceholder: "Search manga",
        };
    },
    watch: {
        dialog(val) {
            if (!val) {
                this.searchText = "";
            }
        },
    },
    methods: {},
};
</script>

<style lang="scss">
.v-input input {
    font-size: 1.2em;
    color: #cfd8dc;
    text-transform: capitalize;
}
</style>
