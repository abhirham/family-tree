<template>
    <v-hover v-slot="{ hover }">
        <v-card
            max-width="374"
            @click="handleCardClick"
            class="mx-5 mb-5 ImageCard"
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="person.img" alt="person"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ person.name.first }} {{ person.name.last }}</v-list-item-title>
                    <v-list-item-subtitle>
                        <div><span class="text--primary">Age:</span> {{ age }} Years</div>
                        <div><span class="text--primary">Sex:</span> {{ person.gender }}</div>
                        <div v-if="person.deceased">
                            <span class="text--primary">Death:</span> {{ formatDate(person.dod, "D MMM, YYYY") }}
                        </div>
                        <div v-if="person.phone" class="d-flex flex-row">
                            <v-icon>mdi-phone</v-icon>
                            {{person.phone}}
                        </div>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <!-- <v-row align="center">
                <v-col cols="4">
                    <v-avatar align>
                    </v-avatar>
                </v-col>
                <v-col cols="8">
                    
                </v-col>
            </v-row> -->
            <!-- <v-btn v-show="hover" absolute top right class="z-1" color="white" @click="$emit('edit')" icon><v-icon>mdi-pencil</v-icon></v-btn>
            <v-fade-transition>
                <v-overlay v-if="hover" absolute > </v-overlay>
            </v-fade-transition> -->

            <!-- <v-card-title
                ></v-card-title
            >

            <v-card-text>
                
            </v-card-text> -->
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
