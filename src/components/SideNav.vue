<template>
    <v-navigation-drawer app clipped permanent expand-on-hover>
        <v-list dense>
            <v-list-item v-for="(user, idx) in sideNavUsers" :key="user.id" @click="setActiveUser(idx)" class="px-2">
                <v-list-item-avatar>
                    <v-img
                        :src="user.img"
                    ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        {{user.name}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "SideNav",
    computed: {
        sideNavUsers(){
            return this.$store.state.selectedUsersHistory;
        }
    },
    methods: {
        setActiveUser(idx){
            this.$store.commit('setSelectedUsersHistory', this.sideNavUsers.filter((x, i) => idx > 0 && i <= idx))
        }
    }
};
</script>
