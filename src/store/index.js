import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { db } from "@/firestore.js";
import {Cloudinary} from "cloudinary-vue";

import messageDialogueModule from "./messageDialogueModule";

Vue.use(Vuex);

const cloudinaryURL = "https://api.cloudinary.com/v1_1/ddta4fa1l/image";

export default new Vuex.Store({
    modules: {
        messageDialogueModule,
    },
    state: {
        selectedUsersHistory: [],
        people: {},
    },
    getters: {
        itemsForSideNav(state) {
            return state.selectedUsersHistory.map((x) => {
                let { id, img, name } = state.people[x];
                return { id, img, name };
            });
        },
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
            state.people = { ...state.people, [payload.id]: payload };
        },
        setPeople(state, payload) {
            state.people = payload;
        },
    },
    actions: {
        uploadImage(ctx, { imageData }) {
            console.log('ii-i', Cloudinary)
            return axios
                .post(cloudinaryURL + "/upload", {
                    file: imageData,
                    upload_preset: "ml9btvbw",
                })
                .then((res) => res.data);
        },
        deleteImage(ctx, { imgPublicId }) {
            return axios
                .post(cloudinaryURL + "/destroy", {
                    public_id: imgPublicId,
                    api_key: "891933346638345"
                })
                .then((res) => res.data);
        },
        saveUserToDB({ commit }, { ...userData }) {
            let docref = db.collection("savarap").doc();
            let payload = { ...userData, id: docref.id, createdOn: new Date() };
            return docref.set(payload).then((res) => {
                commit("addNewMember", payload);

                return payload;
            });
        },
        deleteUser({state, commit}, {userId}) {
            return db.collection("savarap").doc(userId).delete().then(res => {
                let obj = {...state.people};
                delete(obj[userId]);

                commit("setPeople", obj);
            })
        },
        updateUserInDB({ dispatch }, { id, ...userData }) {
            let dataToUpdate = { ...userData, lastEditedAt: new Date() };
            return dispatch("updateDoc", { userId: id, dataToUpdate });
        },
        fetchMembers({ commit }) {
            return db
                .collection("savarap")
                .get()
                .then((res) => {
                    let obj = {};

                    res.forEach((x) => {
                        obj[x.id] = x.data();
                    });

                    commit("setPeople", obj);
                });
        },
        updateDoc({ commit, state }, { userId, dataToUpdate }) {
            return db
                .collection("savarap")
                .doc(userId)
                .update(dataToUpdate)
                .then(() => {
                    commit("addNewMember", {
                        ...state.people[userId],
                        ...dataToUpdate,
                    });
                });
        },
    },
});
