<template>
    <v-container class="my-10">
        <v-row>
            <v-col class="d-flex justify-center">
                <h1>
                    {{ slogan }}
                    <span :class="this.$store.state.colors[title].text">{{
                        title
                    }}</span>
                </h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
            required: true,
        },
        slogan: {
            type: String,
            default: "Browse",
            required: false,
        },
    },
};
</script>

<style lang="scss" scoped>
h1 {
    text-transform: capitalize;
}
</style>
