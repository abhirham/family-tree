<template>
    <div class="Container">
        <template v-for="group in groupedUsersToShow">
            <v-card-title :key="group.title + 's'">{{
                group.title
            }}</v-card-title>
            <v-row class="mb-0" :key="group.title">
                <ImageCard
                    v-for="user in group.users"
                    :disableClick="disableCardClick(user)"
                    :key="user.id"
                    :person="user"
                />
            </v-row>
        </template>
        <AddNewMember v-model="showEditMember" editMode />
    </div>
</template>

<script>
import ImageCard from "./ImageCard.vue";
import AddNewMember from '@/components/AddNewMember.vue';

import _ from "lodash";

export default {
    name: "Container",
    components: {
        ImageCard,
        AddNewMember
    },
    data() {
        return {
            relationToTitleMap: {
                Spouse: "Spouse",
                Child: "Children",
            },
            showEditMember: true
        };
    },
    computed: {
        people() {
            return Object.values(this.$store.state.people);
        },
        usersRelatedMap() {
            let obj = {};

            this.people.forEach((x) => {
                if (!obj[x.id]) {
                    obj[x.id] = [];
                }

                x.related.forEach((y) => {
                    if (!obj[y.id]) {
                        obj[y.id] = [];
                    }
                    obj[x.id].push(y.id);
                    obj[y.id].push(x.id);
                });
            });

            Object.keys(obj).forEach((x) => {
                obj[x] = _.uniq(obj[x]);
            });
            return obj;
        },
        navIds() {
            return this.$store.state.selectedUsersHistory;
        },
        visibleUserIdsMap() {
            let obj = {};

            this.usersToShow.forEach((x) => (obj[x.id] = true));
            return obj;
        },
        activeNavId() {
            return (this.navIds[this.navIds.length - 1] ?? {}).id;
        },
        usersWhoAreChildren() {
            let obj = {};
            this.people.forEach((x) => {
                if (x.related.some((y) => y.relation === "Child")) {
                    obj[x.id] = true;
                }
            });

            return obj;
        },
        usersToShow() {
            return this.people.filter((x) => {
                if (this.activeNavId === undefined) {
                    return (
                        !this.usersWhoAreChildren[x.id] &&
                        !x.related.some((y) => this.usersWhoAreChildren[y.id])
                    );
                }

                return x.related.some((y) => y.id === this.activeNavId);
            });
        },
        groupedUsersToShow() {
            if (this.activeNavId === undefined) {
                return [
                    {
                        title: null,
                        users: this.usersToShow,
                    },
                ];
            }

            let obj = {};
            this.usersToShow.forEach((x) => {
                let relation = "";

                x.related.some((y) => {
                    if (y.id === this.activeNavId) {
                        relation = y.relation;
                        return true;
                    }

                    return false;
                });

                obj[relation] = obj[relation] ?? [];
                obj[relation].push(x);
            });

            let arr = [];

            Object.keys(this.relationToTitleMap).forEach((x) => {
                arr.push({ title: this.relationToTitleMap[x], users: obj[x] });
            });

            return arr.filter((x) => (x.users ?? []).length > 0);
        },
    },
    methods: {
        disableCardClick({ id }) {
            return !this.usersRelatedMap[id].some((x) => {
                return !this.visibleUserIdsMap[x] && x !== this.activeNavId;
            });
        },
    },
    mounted() {
        this.$store.dispatch("fetchMembers");
    },
};
</script>
