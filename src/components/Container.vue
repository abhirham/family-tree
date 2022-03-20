<template>
    <div class="Container">
        <template v-for="group in groupedUsersToShow">
            <v-card-title :key="group.title+'s'">{{group.title}}</v-card-title>
            <v-row justify="center" :key="group.title">
                <ImageCard @select="handleCardSelect(user)" v-for="user in group.users" :key="user.id" :person="user" />
            </v-row>
        </template>
    </div>
</template>

<script>
import ImageCard from "./ImageCard.vue";
import moment from 'moment';

export default {
    name: "Container",
    components: {
        ImageCard,
    },
    data() {
        return {
            people: [
                {
                    name: "OG hus",
                    id: 1,
                    generation: 1,
                    dob: moment("6-12-1960", "D-MM-YYYY"),
                    deceased: true,
                    dod: moment(),
                    gender: "M",
                    description: "",
                    related: [{id: 2, relation: "Husband"}]
                },
                {
                    name: "OG Wife",
                    id: 2,
                    generation: 1,
                    dob: moment("6-12-1960", "D-MM-YYYY"),
                    deceased: true,
                    dod: moment(),
                    gender: "F",
                    description: "",
                    related: [{id: 1, relation: "Wife"}]
                },
                {
                    name: "OG Son",
                    id: 3,
                    generation: 2,
                    dob: moment("6-12-1990", "D-MM-YYYY"),
                    deceased: false,
                    dod: null,
                    gender: "M",
                    description: "",
                    related: [
                        {id: 1, relation: "Son"},
                        {id: 2, relation: "Son"},
                        {id: 4, relation: "Husband"}
                    ]
                },
                {
                    name: "OG Son Wife",
                    id: 4,
                    generation: 2,
                    dob: moment("6-12-1990", "D-MM-YYYY"),
                    deceased: false,
                    dod: null,
                    gender: "F",
                    description: "",
                    related: [
                        {id: 3, relation: "Wife"},
                    ]
                }
            ],
            navIds: [],
            titleToRelationMap: {
                Spouse: ["Wife", "Husband"],
                Children: ["Son", "Daughter"],
            }
        }
    },
    computed: {
        activeNavId(){
            return this.navIds[this.navIds.length-1]
        },
        usersToShow() {
            return this.people.filter(x => {
                if(this.activeNavId === undefined) {
                    return x.generation === 1;
                }

                return x.related.some(y => y.id === this.activeNavId);
            });
        },
        headerToRelationMap() {
            let obj = this.titleToRelationMap;

            let res = {}
            Object.keys(obj).forEach(x => {
                obj[x].forEach(y => res[y] = x);
            })

            return res;
        },
        groupedUsersToShow() {
            if(this.activeNavId === undefined) {
                return [
                    {
                        title: null,
                        users: this.usersToShow
                    }
                ]
            }

            let obj = {};
            this.usersToShow.forEach(x => {
                let relation = "";

                x.related.some(y => {
                    if(y.id === this.activeNavId) {
                        relation = y.relation;
                        return true;
                    }

                    return false;
                });

                obj[this.headerToRelationMap[relation]] = obj[this.headerToRelationMap[relation]] ?? [];
                obj[this.headerToRelationMap[relation]].push(x);
            })

            let arr = []
            
            Object.keys(this.titleToRelationMap).forEach(x => {
                arr.push({title: x, users: obj[x]})
            });

            return arr.filter(x => (x.users ?? []).length > 0);
        }
    },
    methods: {
        handleCardSelect({id}){
            this.navIds = [...this.navIds, id];
        }
    }
};
</script>
