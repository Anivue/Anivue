<template>
    <div class="d-flex">
        <v-chip
            small
            class="mr-2 font-weight-bold"
            :color="media.coverImage.color"
            v-for="(genre, i) in genres"
            :key="i"
            :to="{
                name: 'mediahome',
                params: { type: media.type.toLowerCase() },
                query: { genre },
            }"
        >
            <span :style="{ color: genreColor }">
                {{ genre }}
            </span>
        </v-chip>
    </div>
</template>

<script>
export default {
    props: {
        media: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            genres: this.media.genres.slice(0, 2),
            genreColor: "#fff",
        };
    },
    methods: {
        getGenreColor() {
            const hex = this.media.coverImage.color || "#ffffff";
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
