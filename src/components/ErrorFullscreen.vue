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
                        <h1>Oops! We have stumbled over an error.</h1>
                        <p>Error code: {{ error }}</p>
                        <v-btn elevation="24" @click="$emit('tryAgain')">
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
