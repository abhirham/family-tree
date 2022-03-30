<template>
    <v-navigation-drawer color="green-regular" app permanent>
        <v-toolbar-title class="pageTitle white-tint--text text-center mt-5"
            >Savarap Family</v-toolbar-title
        >
        <v-list dense>
            <v-hover
                v-slot="{ hover }"
                v-for="(user, idx) in sideNavUsers"
                :key="user.id"
            >
                <v-list-item
                    @click="setActiveUser(idx)"
                    :class="['px-2', { 'white-overlay': hover }]"
                >
                    <v-list-item-avatar>
                        <v-img :src="user.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6 green-white--text">
                            {{ user.name.first }} {{ user.name.last }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-hover>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "SideNav",
    computed: {
        sideNavUsers() {
            return this.$store.state.selectedUsersHistory;
        },
    },
    methods: {
        setActiveUser(idx) {
            this.$store.commit(
                "setSelectedUsersHistory",
                this.sideNavUsers.filter((x, i) => idx > 0 && i <= idx)
            );
        },
    },
};
</script>
