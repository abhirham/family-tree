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
    </div>
</template>

<script>
import ImageCard from "./ImageCard.vue";

export default {
    name: "Container",
    components: {
        ImageCard,
    },
    data() {
        return {
            titleToRelationMap: {
                Spouse: ["Wife", "Husband"],
                Children: ["Son", "Daughter"],
            },
        };
    },
    computed: {
        people() {
            return Object.values(this.$store.state.people);
        },
        navIds() {
            return this.$store.state.selectedUsersHistory;
        },
        visibleUserIdsMap() {
            let obj = {};

            this.usersToShow.forEach(x => obj[x.id] = true);
            return obj;
        },
        activeNavId() {
            return (this.navIds[this.navIds.length - 1] ?? {}).id;
        },
        usersToShow() {
            return this.people.filter((x) => {
                if (this.activeNavId === undefined) {
                    return x.generation === 1;
                }

                return x.related.some((y) => y.id === this.activeNavId);
            });
        },
        headerToRelationMap() {
            let obj = this.titleToRelationMap;

            let res = {};
            Object.keys(obj).forEach((x) => {
                obj[x].forEach((y) => (res[y] = x));
            });

            return res;
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

                obj[this.headerToRelationMap[relation]] =
                    obj[this.headerToRelationMap[relation]] ?? [];
                obj[this.headerToRelationMap[relation]].push(x);
            });

            let arr = [];

            Object.keys(this.titleToRelationMap).forEach((x) => {
                arr.push({ title: x, users: obj[x] });
            });

            return arr.filter((x) => (x.users ?? []).length > 0);
        },
    },
    methods: {
        disableCardClick({related, id}) {
            return related.some(x => !this.visibleUserIdsMap[x.id] && x.id !== id);
        }
    }
};
</script>
