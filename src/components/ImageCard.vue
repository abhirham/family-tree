<template>
    <v-hover v-slot="{ hover }">
        <v-card
            max-width="374"
            @click="handleCardClick"
            class="mx-5 mb-5 ImageCard"
        >
            <v-btn v-show="hover" absolute top right class="z-1" color="white" icon><v-icon>mdi-pencil</v-icon></v-btn>
            <v-fade-transition>
                <v-overlay v-if="hover" absolute > </v-overlay>
            </v-fade-transition>
            <v-img height="250" :src="person.img"></v-img>

            <v-card-title
                >{{ person.name.first }} {{ person.name.last }}</v-card-title
            >

            <v-card-text>
                <div><b>Age:</b> {{ age }} Years</div>
                <div><b>Sex:</b> {{ person.gender }}</div>
                <div v-if="person.deceased">
                    <b>Death:</b> {{ formatDate(person.dod, "D MMM, YYYY") }}
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
import moment from "moment";

export default {
    name: "ImageCard",
    props: {
        person: {
            required: true,
            type: Object,
        },
        disableClick: {
            default: false,
            type: Boolean,
        },
    },
    computed: {
        age() {
            let { deceased, dod, dob } = this.person;
            let end = deceased ? moment(dod) : moment();
            return end.diff(dob, "years");
        },
    },
    methods: {
        handleCardClick() {
            if (this.disableClick) {
                return;
            }

            let { id, img, name } = this.person;
            this.$store.commit("addUserToHistory", { id, img, name });
        },
        formatDate(date, format) {
            return moment(date).format(format);
        },
    },
};
</script>

<style>
.z-1 {
    z-index: 20;
}
</style>
