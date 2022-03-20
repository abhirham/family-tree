<template>
    <v-card
        max-width="374"
        @click="$emit('select')"
        class="mx-5 mb-5 ImageCard"
    >
        <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <v-card-title>{{ person.name }}</v-card-title>

        <v-card-text>
            <div><b>Age:</b> {{ age }} Years</div>
            <div><b>Sex:</b> {{ person.gender }}</div>
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
    },
    computed: {
        age() {
            return moment().diff(this.person.dob, "years");
        },
    },
};
</script>
