<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-card
                v-bind="attrs"
                v-on="on"
                width="85"
                :to="{ name: 'mediafullpage', params: { type, id } }"
            >
                <v-img
                    :aspect-ratio="85 / 115"
                    width="85"
                    height="115"
                    :src="image.large"
                    :lazy-src="image.medium"
                >
                </v-img>
            </v-card>
        </template>
        <span>
            {{ title }}
        </span>
    </v-tooltip>
</template>

<script>
export default {
    props: {
        media: {
            type: Object,
            required: true,
        },
    },
    computed: {
        type() {
            return "type" in this.media
                ? this.media.type.toLowerCase()
                : "characters";
        },
        id() {
            return this.media.id;
        },
        title() {
            if (this.type === "characters") {
                return this.media.name.full;
            } else {
                return this.media.title.english || this.media.title.romaji;
            }
        },
        image() {
            return this.type === "characters"
                ? this.media.image
                : this.media.coverImage;
        },
    },
};
</script>
