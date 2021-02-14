<template>
    <v-col
        md="9"
        class="d-flex justify-center justify-md-start align-center align-md-start flex-column"
    >
        <div class="mb-10 text-center text-md-left">
            <h2 class="mb-3 text-h4">{{ title }}</h2>
            <p class="text--secondary">{{ subtitle }}</p>
        </div>

        <p class="subtitle-1 text--secondary" v-html="description"></p>
        <genre-chips v-if="mediaType !== 'characters'" :genres="media.genres" />
    </v-col>
</template>

<script>
import GenreChips from "./GenreChips";
// import DynamicDescription from "./DynamicDescription";
export default {
    components: {
        GenreChips,
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
            // ! FIX OR REMOVE
            // if (this.mediaType === "characters") {
            //     return this.media.description.replace(
            //         /<a href="https:\/\/anilist\.co\/character\/(\d+)\/.+?">(.+?)<\/a>/g,
            //         `<a href="/search/characters/$1">$2</a>`
            //     );
            // } else {
            //     return this.media.description;
            // }
            return this.media.description;
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
