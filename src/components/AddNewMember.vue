<template>
    <v-dialog
        v-model="showModal"
        persistent
        no-click-animation
        content-class="AddNewMember"
        max-width="600"
    >
        <v-card>
            <v-card-title>
                Add Family Member
                <v-btn icon right absolute @click="showModal = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                >
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            prepend-inner-icon="mdi-camera"
                            prepend-icon=""
                            label="Photo"
                            v-model="img"
                            outlined
                            dense
                            hide-details="auto"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            hide-details="auto"
                            v-model="name.first"
                            outlined
                            dense
                            label="First Name"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            hide-details="auto"
                            v-model="name.last"
                            outlined
                            dense
                            label="Last Name"
                        />
                    </v-col>
                    <v-col cols="6">
                        <DatePicker
                            v-model="dob"
                            label="Date of birth"
                            disableFuture
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            hide-details="auto"
                            v-model="gender"
                            outlined
                            dense
                            label="Gender"
                            :items="['Male', 'Female']"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-checkbox
                            label="Is this person dead?"
                            v-model="deceased"
                            hide-details="auto"
                            dense
                        />
                    </v-col>
                    <v-col cols="6" v-if="deceased">
                        <DatePicker
                            v-model="dod"
                            label="Date of death"
                            disableFuture
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            outlined
                            v-model="description"
                            hide-details="auto"
                            dense
                            label="A few words about this person"
                        />
                    </v-col>
                    <v-col cols="12" class="py-0">
                        <v-card-subtitle class="py-0 font-weight-bold"
                            >Relations</v-card-subtitle
                        >
                    </v-col>
                    <template v-for="(r, idx) in related">
                        <v-col :key="idx" cols="6">
                            <v-autocomplete
                                outlined
                                dense
                                v-model="r.id"
                                label="Related to"
                                hide-details="auto"
                                :items="existingMembers"
                                item-text="name"
                                item-value="id"
                            />
                        </v-col>
                        <v-col
                            :key="idx + 'r'"
                            v-show="r.id !== undefined"
                            cols="5"
                        >
                            <v-autocomplete
                                outlined
                                dense
                                v-model="r.relation"
                                label="Relation"
                                hide-details="auto"
                                :items="relations"
                                @change="handleRelationChage(idx)"
                            />
                        </v-col>
                        <v-col
                            :key="idx + 'rx'"
                            v-show="r.id !== undefined"
                            class="px-0"
                            cols="1"
                        >
                            <v-btn icon @click="removeRelatedUser(idx)"
                                ><v-icon>mdi-delete-outline</v-icon></v-btn
                            >
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    :disabled="disableSaveBtn"
                    @click="handleSaveClick"
                    >save</v-btn
                >
                <v-btn color="primary" outlined @click="showModal = false"
                    >cancel</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import _ from 'lodash';

export default {
    name: "AddNewMember",
    props: {
        value: { required: true, type: Boolean },
    },
    components: { DatePicker },
    data() {
        return {
            name: {
                first: "",
                last: "",
            },
            dob: null,
            gender: null,
            deceased: false,
            dod: null,
            description: "",
            img: null,
            related: [{}],
            isRelatedInValid: false,
            relations: ["Spouse", "Child", "Sibling"]
        };
    },
    computed: {
        showModal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
        disableSaveBtn() {
            return (
                this.name.first === "" ||
                this.name.last === "" ||
                this.gender === null ||
                this.dob === null ||
                (this.deceased && this.dod === null) ||
                this.isRelatedInValid
            );
        },
        existingMembers() {
            return Object.values(this.$store.state.people).map(
                ({ id, name }) => ({ id, name: `${name.first} ${name.last}` })
            );
        },
    },
    methods: {
        handleRelationChage(idx) {
            if (idx === this.related.length - 1) {
                this.related = [...this.related, {}];
            }
        },
        handleSaveClick() {
            let {name, dob, gender, deceased, dod, description, img, related} = this;
            let payload = {
                id: this.existingMembers.length,
                name, dob, gender, deceased, dod, description, img, related: related.slice(0, -1)
            }
            this.$store.commit("addNewMember", payload);
            this.showModal = false;
        },
        removeRelatedUser(idx) {
            let arr = this.related.filter((_, i) => i !== idx);
            if (
                arr
                    .slice(-1)
                    .some((x) => x.id !== undefined && x.relation !== undefined)
            ) {
                arr.push({});
            }
            this.related = arr;
        },
    },
    watch: {
        related: {
            deep: true,
            handler(val) {
                this.isRelatedInValid = val
                    .filter(
                        (x) => x.id !== undefined || x.relation !== undefined
                    )
                    .some(
                        (x) => x.id === undefined || x.relation === undefined
                    );
            },
        },
    },
};
</script>

<style>
.AddNewMember .v-select__selection--comma {
    overflow: visible !important;
}
</style>
