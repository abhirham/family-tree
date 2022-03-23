<template>
    <v-card
        max-width="374"
        @click="handleCardClick"
        class="mx-5 mb-5 ImageCard"
    >
        <v-img
            height="250"
            :src="person.img"
        ></v-img>

        <v-card-title>{{ person.name.first }} {{ person.name.last }}</v-card-title>

        <v-card-text>
            <div><b>Age:</b> {{ age }} Years</div>
            <div><b>Sex:</b> {{ person.gender }}</div>
            <div v-if="person.deceased"><b>Death:</b> {{ formatDate(person.dod, 'D MMM, YYYY') }}</div>
        </v-card-text>
    </v-card>
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
            return moment().diff(this.person.dob, "years");
        },
    },
    methods: {
        handleCardClick() {
            if(this.disableClick){
                return;
            }

            let {id, img, name} = this.person;
            this.$store.commit('addUserToHistory', {id, img, name});
        },
        formatDate(date, format) {
            return moment(date).format(format);
        }
    }
};
</script>
