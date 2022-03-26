import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import {db} from '@/firestore.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedUsersHistory: [],
        people: {},
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
        },
        setPeople(state, payload) {
            state.people = payload;
        }
    },
    actions: {
        uploadImage(ctx, {imageData}) {
            return axios.post('https://api.cloudinary.com/v1_1/ddta4fa1l/image/upload', {
                file: imageData,
                upload_preset: "ml9btvbw"
            }).then(res => res.data);
        },
        saveUserToDB({commit}, {name, dob, gender, deceased, dod, description, img, related}) {
            let docref = db.collection('savarap').doc();
            let payload = {name, dob, gender, deceased, dod, description, img, related, id: docref.id, createdOn: new Date()};
            return docref.set(payload).then(res => {
                commit("addNewMember", payload);

                return payload;
            });
        },
        fetchMembers({commit}){
            return db.collection("savarap").get().then(res => {
                let obj = {};

                res.forEach(x => {
                    obj[x.id] = x.data();
                });

                commit("setPeople", obj);
            })
        },
        updateDoc({commit, state}, {userId, dataToUpdate}) {
            return db.collection("savarap").doc(userId).update(dataToUpdate).then(() => {
                commit("addNewMember", {...state.people[userId], ...dataToUpdate});
            });
        }
    },
    modules: {},
});
