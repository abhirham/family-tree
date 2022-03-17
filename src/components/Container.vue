<template>
    <div class="Container">
        <v-row justify="center">
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
            <ImageCard :person="people[0]" />
        </v-row>
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
                    name: "Anand Kumar",
                    id: 1,
                    dob: moment("6-12-1960", "D-MM-YYYY"),
                    gender: "M"
                }
            ]
        }
    },
};
</script>
