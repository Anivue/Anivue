<template>
    <div>
        <v-app-bar
            elevate-on-scroll
            app
            class="navbar"
            :elevation="hideOnScroll ? 4 : ''"
            :collapse="hideOnScroll"
            :hide-on-scroll="hideOnScroll"
        >
            <v-app-bar-nav-icon
                class="white--text"
                @click="drawer = true"
            ></v-app-bar-nav-icon>

            <v-toolbar-title
                class="font-weight-bold pl-0 font-weight-light pointer nocopy"
                @click="goToHome()"
            >
                <!-- <v-icon color="light-green">mdi-vuejs</v-icon> -->
                <!-- Ani<span class="light-green--text">Vue</span> -->
                <v-img
                    class="logoImg"
                    src="../assets/logo.png"
                    height="30"
                    width="115"
                ></v-img>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-dialog
                overlay-opacity="0.9"
                v-model="dialog"
                width="500"
                class="transparent"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mr-1" icon v-bind="attrs" v-on="on">
                        <v-icon color="white">mdi-magnify</v-icon>
                    </v-btn>
                </template>

                <v-card class="pa-1 px-4 rounded elevation-24">
                    <v-form @submit.prevent="search" ref="searchForm">
                        <v-card-actions>
                            <v-text-field
                                @input="watchButtonState"
                                spellcheck="false"
                                placeholder="Search..."
                                v-model="searchText"
                                autofocus
                                :rules="rules"
                            >
                            </v-text-field>
                            <v-btn
                                icon
                                large
                                class="ml-2"
                                type="submit"
                                :disabled="buttonDisabled"
                            >
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <v-btn icon class="mr-1 d-md-none" to="/profile">
                <v-icon color="white">mdi-account</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            overlay-opacity="0.8"
            app
            v-model="drawer"
            temporary
        >
            <v-list-item class="navbar">
                <v-list-item-content>
                    <v-list-item-title
                        class="title pointer"
                        @click="goToHome()"
                    >
                        <center>
                            <v-img
                                class="logoImg"
                                src="../assets/logo.png"
                                height="30"
                                width="115"
                            ></v-img>
                        </center>
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
                    <v-list-item @click="changeTheme">
                        <v-list-item-icon>
                            <v-icon>
                                mdi-theme-light-dark
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Change Theme
                        </v-list-item-title>
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
            buttonDisabled: true,
            drawer: false,
            group: null,
            navLinks: this.$store.state.navLinks,
            dialog: false,
            searchText: "",
            searchPlaceholder: "Search manga",
            colors: this.$store.state.colors,
            hideOnScroll: true,
            rules: [
                (value) => !!value || "Required",
                (value) => (value || "").length <= 20 || "Max 20 characters",
            ],
        };
    },
    watch: {
        dialog(val) {
            if (!val) {
                setTimeout(() => {
                    this.$refs.searchForm.reset();
                }, 200);
            }
        },
    },
    methods: {
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            this.$cookies.set("isDarkTheme", this.$vuetify.theme.dark);
        },
        watchButtonState() {
            if (this.$refs.searchForm.validate()) {
                this.buttonDisabled = false;
            } else {
                this.buttonDisabled = true;
            }
        },
        goToHome() {
            this.$router.push("/home").catch((err) => {
                err;
            });
        },
        search() {
            if (this.$refs.searchForm.validate()) {
                this.dialog = false;
                this.$router.push({
                    path: "/search",
                    query: { search: this.searchText },
                });
            }
        },
        setHideOnScroll() {
            this.hideOnScroll = window.innerWidth > 960;
        },
    },
    computed: {
        searchQuery() {
            return this.searchText.toLowerCase();
        },
    },
    mounted() {
        this.setHideOnScroll();
        window.addEventListener("resize", this.setHideOnScroll);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHideOnScroll);
    },
};
</script>

<style lang="scss">
.v-input input {
    font-size: 1.2em;
    color: #cfd8dc;
    text-transform: capitalize;
}

.nocopy {
    user-select: none;
}

.logoImg {
    filter: brightness(0) invert(1);
}
</style>
