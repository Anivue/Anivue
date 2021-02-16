<template>
    <v-container class="my-10">
        <v-row>
            <v-col class="d-flex justify-center">
                <h1>
                    <span class="font-weight-light">Browse </span>
                    <span :class="this.$store.state.colors[title].text">{{
                        title
                    }}</span>
                    <span class="ml-3">
                        <v-icon>
                            {{ this.$store.state.icons[title] }}
                        </v-icon>
                    </span>
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
    },
};
</script>

<style lang="scss" scoped>
h1 {
    text-transform: capitalize;
}
</style>
