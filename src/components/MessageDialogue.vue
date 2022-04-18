<template>
    <v-snackbar
        :id="
            status == 'success'
                ? 'del-obj-snack-success'
                : 'del-obj-snack-error'
        "
        v-model="showDialog"
        :color="status"
        :timeout="6000"
        bottom
        text
    >
        <v-icon
            :color="status == 'success' ? 'success' : 'error'"
            small
            class="pr-2"
        >
            {{
                status == "success"
                    ? "mdi-check-circle-outline"
                    : "mdi-alert-circle-outline"
            }}
        </v-icon>
        <span class="text-color" v-html="message"></span>
        <template v-slot:action="{ attrs }">
            <v-btn
                class="text-color"
                dark
                text
                v-bind="attrs"
                @click="closeDialog"
                >Dismiss</v-btn
            >
        </template>
    </v-snackbar>
</template>

<script>
import vuex from "vuex";

export default {
    name: "MessageDialogue",
    computed: {
        ...vuex.mapState("messageDialogueModule", ["message", "status"]),
        showDialog: {
            get() {
                return this.$store.getters["messageDialogueModule/showDialog"];
            },
            set(val) {
                this.closeDialog();
            },
        },
    },
    methods: {
        closeDialog() {
            this.$store.commit("messageDialogueModule/hideDialog");
        },
    },
};
</script>
<style>
#del-obj-snack-success .v-snack__wrapper.success--text {
    border: 1px solid #5fb17e !important;
}
#del-obj-snack-error .v-snack__wrapper.error--text {
    border: 1px solid #f16992 !important;
}
.text-color {
    color: #565a65 !important;
}
</style>
