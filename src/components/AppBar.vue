<template>
    <v-app-bar clipped-left app color="red" dark elevate-on-scroll>
        <v-toolbar-title class="pageTitle">Savarap Family</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showAddNewMember = true"><v-icon left>mdi-plus</v-icon>add new</v-btn>
        <AddNewMember v-model="showAddNewMember" />
    </v-app-bar>
</template>

<script>
import AddNewMember from './AddNewMember.vue';
export default {
    name: "AppBar",
    components: {
        AddNewMember
    },
    data() {
        return {
            showAddNewMember: true
        }
    },
};
</script>
