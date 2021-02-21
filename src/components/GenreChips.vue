<template>
    <v-container fluid>
        <center class="d-block d-md-none">
            <v-chip
                :to="{ name: 'mediahome', params: { type }, query: { genre } }"
                class="ma-2 elevation-2 text--secondary"
                v-for="(genre, index) in genres"
                :color="color"
                :key="index"
            >
                <span :style="{ color: genreColor }">{{ genre }}</span>
            </v-chip>
        </center>
        <div class="d-none d-md-block">
            <v-chip
                :color="color"
                :to="{ name: 'mediahome', params: { type }, query: { genre } }"
                class="ma-2 elevation-2 text--secondary"
                v-for="(genre, index) in genres"
                :key="index"
            >
                <span :style="{ color: genreColor }">{{ genre }}</span>
            </v-chip>
        </div>
    </v-container>
</template>

<script>
export default {
    props: {
        genres: {
            type: Array,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            genreColor: "",
        };
    },
    computed: {
        type() {
            return this.$route.params.type;
        },
    },
    methods: {
        getGenreColor() {
            const hex = this.color || "#ffffff";
            function hex_to_rgb(hex) {
                let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                    hex
                );
                return result
                    ? {
                          r: parseInt(result[1], 16),
                          g: parseInt(result[2], 16),
                          b: parseInt(result[3], 16),
                      }
                    : null;
            }
            function hex_inverse_bw(hex) {
                let rgb = hex_to_rgb(hex);
                let luminance =
                    0.2126 * rgb["r"] + 0.7152 * rgb["g"] + 0.0722 * rgb["b"];
                return luminance < 140 ? "#ffffff" : "#8a2c0f";
            }
            return hex_inverse_bw(hex);
        },
    },
    mounted() {
        this.genreColor = this.getGenreColor();
    },
};
</script>

<style lang="scss" scoped></style>
