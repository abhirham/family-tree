import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedUsersHistory: [],
        people: {
            1: {
                name: "OG hus",
                id: 1,
                img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                generation: 1,
                dob: "[native Date Tue Dec 06 1960 00:00:00 GMT-0500 (Eastern Standard Time)]",
                deceased: true,
                dod: "[native Date Tue Mar 22 2022 02:50:01 GMT-0400 (Eastern Daylight Time)]",
                gender: "M",
                description: "",
                related: [
                    {
                        id: 2,
                        relation: "Husband",
                    },
                ],
            },
            2: {
                name: "OG Wife",
                id: 2,
                img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                generation: 1,
                dob: "[native Date Tue Dec 06 1960 00:00:00 GMT-0500 (Eastern Standard Time)]",
                deceased: true,
                dod: "[native Date Tue Mar 22 2022 02:50:01 GMT-0400 (Eastern Daylight Time)]",
                gender: "F",
                description: "",
                related: [
                    {
                        id: 1,
                        relation: "Wife",
                    },
                ],
            },
            3: {
                name: "OG Son",
                id: 3,
                img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                generation: 2,
                dob: "[native Date Thu Dec 06 1990 00:00:00 GMT-0500 (Eastern Standard Time)]",
                deceased: false,
                dod: null,
                gender: "M",
                description: "",
                related: [
                    {
                        id: 1,
                        relation: "Son",
                    },
                    {
                        id: 2,
                        relation: "Son",
                    },
                    {
                        id: 4,
                        relation: "Husband",
                    },
                ],
            },
            4: {
                name: "OG Son Wife",
                id: 4,
                img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                generation: 2,
                dob: "[native Date Thu Dec 06 1990 00:00:00 GMT-0500 (Eastern Standard Time)]",
                deceased: false,
                dod: null,
                gender: "F",
                description: "",
                related: [
                    {
                        id: 3,
                        relation: "Wife",
                    },
                ],
            },
        },
    },
    getters: {
        itemsForSideNav(state) {
            return state.selectedUsersHistory.map(x => {
                let {id, img, name} = state.people[x];
                return {id, img, name};
            })
        }
    },
    mutations: {
        setSelectedUsersHistory(state, payload) {
            state.selectedUsersHistory = payload;
        },
        addUserToHistory(state, payload) {
            state.selectedUsersHistory = [
                ...state.selectedUsersHistory,
                payload,
            ];
        },
    },
    actions: {},
    modules: {},
});
