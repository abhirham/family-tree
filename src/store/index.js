import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedUsersHistory: [],
        people: {
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
        addNewMember(state, payload) {
            state.people = {...state.people, [payload.id]: payload}
        }
    },
    actions: {
        uploadImage(ctx, {imageData}) {
            return axios.post('https://api.cloudinary.com/v1_1/ddta4fa1l/image/upload', {
                file: imageData,
                upload_preset: "ml9btvbw"
            }).then(res => res.data);
        }
    },
    modules: {},
});
