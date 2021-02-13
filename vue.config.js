module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: "/",
    pwa: {
        name: "Anivue",
        themeColor: "#272727",
        msTileColor: "#272727",
        manifestOptions: {
            background_color: "#272727",
            start_url: "./index.html",
        },
    },
};
