<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <div>
                    <center>
                        <v-img
                            class="mb-5"
                            src="../assets/404.png"
                            width="150"
                            height="170"
                        ></v-img>
                        <h1 class="primary--text">Oops! Page is gone.</h1>
                        <p class="secondary--text">
                            The page you are looking for is missing...
                        </p>
                        <v-btn
                            class="navbar white--text"
                            elevation="24"
                            to="/home"
                        >
                            Get ready! Going home in {{ fancyTime }}
                        </v-btn>
                    </center>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "NotFound",
    data() {
        return {
            time: 10,
        };
    },
    computed: {
        fancyTime() {
            if (this.time < 10) {
                return `00:0${this.time}`;
            } else {
                return `00:${this.time}`;
            }
        },
    },
    mounted() {
        const timer = setInterval(() => {
            if (this.time === 0) {
                clearInterval(timer);
                // Check if user still on 404 page
                if (this.$route.name === "404") {
                    this.$router.push({ path: "/home" });
                }
            }
            this.time--;
        }, 1000);
    },
};
</script>

<style lang="scss" scoped>
.blur {
    filter: blur(4px);
}
</style>
