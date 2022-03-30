<template>
    <div class="AddNewMemberContainer">
        <v-btn fixed bottom right color="primary" @click="showAddNewMember = true"><v-icon left>mdi-plus</v-icon>add new</v-btn>
        <AddNewMember v-if="showAddNewMember" v-model="showAddNewMember" />
    </div>
</template>

<script>
import AddNewMember from './AddNewMember.vue';
export default {
    name: "AddNewMemberContainer",
    components: {
        AddNewMember
    },
    data() {
        return {
            showAddNewMember: false
        }
    },
};
</script>
