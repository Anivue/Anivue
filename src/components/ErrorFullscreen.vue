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
                        <h1 class="primary--text">Oops!</h1>
                        <p class="secondary--text">We've got an error...</p>
                        <v-btn
                            class="navbar white--text"
                            elevation="24"
                            @click="$emit('tryAgain')"
                        >
                            Try again
                        </v-btn>
                    </center>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    error: {
        type: [String, Number],
        required: true,
    },
};
</script>
