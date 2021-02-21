import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blueGrey.darken3,
                secondary: colors.blueGrey.lighten1,
                accent: colors.lightBlue.darken2,
                navbar: colors.blueGrey.darken3,
                background: colors.blueGrey.lighten5,
                cardgenres: "#fff",
            },
            dark: {
                primary: colors.shades.white,
                secondary: colors.grey.lighten1,
                navbar: "#333333",
                background: "#181818",
                cardgenres: "#1e1e1e",
            },
        },
        dark: false,
    },
    icons: {
        iconfont: "mdi",
    },
});
