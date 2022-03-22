<template>
    <v-app>
        <v-app-bar clipped-left app color="red" dark elevate-on-scroll>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-navigation-drawer app clipped absolute permanent expand-on-hover></v-navigation-drawer>
        <v-main class="grey">
            <Container />
        </v-main>
    </v-app>
</template>

<script>
import Container from "./components/Container";

export default {
    name: "App",

    components: {
        Container,
    },

    data: () => ({
        //
    }),
};
</script>

<style>
* {
    font-family: 'Poppins', sans-serif;
}
</style>