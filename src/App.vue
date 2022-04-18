<template>
    <v-app>
        <SideNav />
        <v-main class="gray">
            <Container />
        </v-main>
        <AddNewMemberContainer />
        <MessageDialogue />
    </v-app>
</template>

<script>
import Container from "./components/Container";
import SideNav from "./components/SideNav";
import AddNewMemberContainer from "./components/AddNewMemberContainer";
import MessageDialogue from "./components/MessageDialogue";

export default {
    name: "App",

    components: {
        Container,
        SideNav,
        AddNewMemberContainer,
        MessageDialogue,
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
