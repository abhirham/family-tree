<template>
    <v-app>
        <SideNav />
        <v-main class="gray">
            <Container />
        </v-main>
        <AddNewMemberContainer />
    </v-app>
</template>

<script>
import Container from "./components/Container";
import SideNav from "./components/SideNav";
import AddNewMemberContainer from "./components/AddNewMemberContainer";

export default {
    name: "App",

    components: {
        Container,
        SideNav,
        AddNewMemberContainer,
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
