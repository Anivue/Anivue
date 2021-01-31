<template>
    <v-col cols="12" :class="`d-flex justify-${justify}`">
        <h1 class="text-h5 font-weight-bold">
            <v-icon v-if="icon">{{ icon }}</v-icon> {{ title }}
        </h1>
    </v-col>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        justify: {
            type: String,
            default: "center",
        },
        icon: {
            type: String,
            default: "",
        },
    },
};
</script>
