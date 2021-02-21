<template>
    <div>
        <h1 class="font-weight-light text-center primary--text capitalize">
            {{ type }}
        </h1>
        <p class="secondary--text">Nothing here yet...</p>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.capitalize {
    text-transform: capitalize;
}
</style>
