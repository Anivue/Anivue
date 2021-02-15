<template>
    <div class="wrapper">
        <profile-info v-if="this.$store.state.user.loggedIn" />
        <login v-else />
    </div>
</template>

<script>
import Login from "../components/Login";
import ProfileInfo from "../components/ProfileInfo";
export default {
    name: "profile",
    components: {
        Login,
        ProfileInfo,
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    height: 100%;
}
</style>
