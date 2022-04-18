export default {
    name: 'messageDialogueModule',
    namespaced: true,
    state: {
        message: '',
        status: '',
        actionItem: {}
    },
    getters: {
        showDialog: (state) => state.message.length > 0 
    },
    mutations: {
        showDialog(state, {message, status = "success", icon, cb}) {
            state.message = message;
            state.actionItem = {icon, cb};
            state.status = status === "success" ? "success" : "error";
        },
        hideDialog(state) {
            state.message = "";
        }
    }
}