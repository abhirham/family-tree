<template>
    <v-app>
        <v-app-bar clipped-left app color="red" dark elevate-on-scroll>
            <v-toolbar-title class="pageTitle">Savarap Family</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <SideNav />
        <v-main class="grey">
            <Container />
        </v-main>
    </v-app>
</template>

<script>
import Container from "./components/Container";
import SideNav from "./components/SideNav";

export default {
    name: "App",

    components: {
        Container,
        SideNav
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

.pageTitle {
    font-family: 'Pacifico', cursive;
    overflow: visible !important;
}
</style>