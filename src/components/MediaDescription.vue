<template>
    <v-col
        md="9"
        class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
    >
        <media-title :media="media" :mobile="false" />

        <p
            class="subtitle-1 description--text text-center text-md-left"
            v-html="description"
        ></p>
    </v-col>
</template>

<script>
import MediaTitle from "./MediaTitle";
export default {
    components: {
        MediaTitle,
    },
    props: {
        media: {
            type: Object,
            required: true,
        },
        mediaType: {
            type: String,
            required: true,
        },
    },
    computed: {
        title() {
            if (this.mediaType !== "characters") {
                if (this.media.title.english) {
                    return this.media.title.english;
                } else {
                    return this.media.title.romaji;
                }
            } else {
                return Object.values(this.media.name)
                    .slice(0, -1)
                    .join(" ");
            }
        },
        subtitle() {
            if (this.mediaType === "characters") {
                return this.media.name.native;
            } else {
                return this.media.title.native;
            }
        },
        description() {
            return this.media.description.replace(
                /<a href="https:\/\/anilist\.co\/.+?\/(\d+)\/.+?">(.+?)<\/a>/g,
                `$2`
            );
        },
    },
    mounted() {
        // HIDE SPOILERS
        const spoilers = document.querySelectorAll(".markdown_spoiler");
        for (let spoiler of spoilers) {
            const spoilerSpan = spoiler.children[0];
            const spoilerText = spoilerSpan.textContent;
            let spoilerActive = false;
            spoilerSpan.textContent = "Spoiler, click to view.";
            spoilerSpan.classList.add("spoiler");
            spoilerSpan.addEventListener("click", () => {
                spoilerActive = !spoilerActive;
                if (spoilerActive) {
                    spoilerSpan.textContent = "Spoiler, click to view.";
                    spoilerSpan.classList.add("spoiler");
                    spoilerSpan.classList.remove("spoiler_active");
                } else {
                    spoilerSpan.textContent = spoilerText;
                    spoilerSpan.classList.remove("spoiler");
                    spoilerSpan.classList.add("spoiler_active");
                }
            });
        }
    },
};
</script>

<style lang="scss">
.spoiler {
    color: #2196f3;
}

.spoiler_active {
    font-style: italic;
}

.markdown_spoiler {
    cursor: pointer;
}
</style>
