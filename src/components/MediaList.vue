<template>
    <div>
        <h1 class="font-weight-light text-center">
            {{ type }}
        </h1>
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
