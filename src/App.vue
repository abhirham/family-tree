<template>
    <v-app>
        <AppBar />
        <SideNav />
        <v-main class="grey">
            <Container />
        </v-main>
    </v-app>
</template>

<script>
import Container from "./components/Container";
import SideNav from "./components/SideNav";
import AppBar from "./components/AppBar";

export default {
    name: "App",

    components: {
        Container,
        SideNav,
        AppBar,
    },

    data: () => ({
        //
    }),
};
</script>

<style>
* {
    font-family: "Poppins", sans-serif;
}

.pageTitle {
    font-family: "Pacifico", cursive;
    overflow: visible !important;
}
</style>
