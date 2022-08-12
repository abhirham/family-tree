<template>
    <div class="d-flex flex-column mx-4">
        <v-card max-width="400px" @click="handleCardClick" class="ImageCard" rounded="lg">
            <v-list-item>
                <v-list-item-avatar size="70">
                    <v-img :src="person.img" alt="person"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title
                        >{{ person.name.first }}
                        {{ person.name.last }}</v-list-item-title
                    >
                    <v-list-item-subtitle>
                        <div>
                            <span class="text--primary">Age:</span> {{ age }} Years
                        </div>
                        <div>
                            <span class="text--primary">Sex:</span>
                            {{ person.gender }}
                        </div>
                        <div v-if="person.deceased">
                            <span class="text--primary">Death:</span>
                            {{ formatDate(person.dod, "D MMM, YYYY") }}
                        </div>
                        <div v-if="person.phone" class="d-flex flex-row">
                            <v-icon>mdi-phone</v-icon>
                            {{ person.phone }}
                        </div>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn @click="$emit('edit')" icon
                        ><v-icon>mdi-pencil</v-icon></v-btn
                    >
                </v-list-item-action>
            </v-list-item>
        </v-card>
        <v-btn class="align-self-center mt-4" color="primary" @click="handleRelatedClick" >view related</v-btn>
    </div>
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
        handleRelatedClick() {
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