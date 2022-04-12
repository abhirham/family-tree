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
                {{editMode ? "Edit" : "Add"}} Family Member
                <v-btn icon right absolute @click="showModal = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                >
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-btn v-if="imgUrl && img === null" @click="$refs.imgInput.click()">Change Image</v-btn>
                        <v-file-input
                            accept=".jpg , .jpeg , .jfif , .pjpeg , .pjp, .png, .svg, .webp"
                            label="Upload Image"
                            v-model="img"
                            ref="imgInput"
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
                        <v-text-field
                            hide-details="auto"
                            v-model="email"
                            outlined
                            dense
                            type="email"
                            label="Email"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            hide-details="auto"
                            v-model="phone"
                            outlined
                            dense
                            type="number"
                            label="Phone"
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
                    <v-col cols="6" v-show="deceased">
                        <DatePicker
                            v-model="dod"
                            label="Date of death"
                            disableFuture
                            :minDate="dob"
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
                    <template v-if="existingMembers.length > 0">
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
                    </template>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    :disabled="disableSaveBtn"
                    @click="handleUpdateClick"
                    :loading="loading"
                    v-if="editMode"
                    >update</v-btn
                >
                <v-btn
                    v-else
                    color="primary"
                    :disabled="disableSaveBtn"
                    @click="handleSaveClick"
                    :loading="loading"
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
import _ from "lodash";

export default {
    name: "AddNewMember",
    props: {
        value: { required: true, type: Boolean },
        editMode: { default: false, type: Boolean },
        userBeingEdited: { default: null, type: Object },
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
            email: "",
            phone: "",
            img: null,
            imgUrl: null,
            related: [{}],
            isRelatedInValid: false,
            relations: ["Spouse", "Child", "Sibling"],
            loading: false,
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
        convertFileToBase64(file) {
            return new Promise((res, rej) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    res(reader.result);
                };
                reader.onerror = function (error) {
                    rej(error);
                };
            });
        },
        async handleSaveClick() {
            this.loading = true;
            let img = null;
            try {
                if (this.img) {
                    let imageData = await this.convertFileToBase64(this.img);

                    let imageRes = await this.$store.dispatch("uploadImage", {
                        imageData,
                    });
                    img = imageRes.url;
                }

                let {
                    name,
                    dob,
                    gender,
                    deceased,
                    dod,
                    description,
                    related,
                    phone,
                    email,
                } = this;
                let payload = {
                    name,
                    dob,
                    gender,
                    deceased,
                    dod,
                    description,
                    img,
                    phone,
                    email,
                    related: related.slice(0, -1),
                };

                let res = await this.$store.dispatch("saveUserToDB", payload);
                let promiseArr = [];

                related.forEach((x) => {
                    if (x.relation === "Spouse") {
                        let { related } = this.$store.state.people[x.id];
                        related.push({ id: res.id, relation: "Spouse" });
                        promiseArr.push(
                            this.$store.dispatch("updateDoc", {
                                userId: x.id,
                                dataToUpdate: { related },
                            })
                        );
                    }
                });

                await Promise.all(promiseArr);

                this.showModal = false;
            } finally {
                this.loading = false;
            }
        },
        async handleUpdateClick() {
            this.loading = true;
            let img = null;
            try {
                if (this.img) {
                    let imageData = await this.convertFileToBase64(this.img);

                    let imageRes = await this.$store.dispatch("uploadImage", {
                        imageData,
                    });
                    img = imageRes.url;
                }

                let {
                    name,
                    dob,
                    gender,
                    deceased,
                    dod,
                    description,
                    related,
                    phone,
                    email,
                } = this;
                let payload = {
                    name,
                    dob,
                    gender,
                    deceased,
                    dod,
                    description,
                    img,
                    phone,
                    email,
                    related: related.slice(0, -1),
                };

                let res = await this.$store.dispatch("updateUserInDB", payload);
                let promiseArr = [];

                related.forEach((x) => {
                    if (x.relation === "Spouse") {
                        let { related } = this.$store.state.people[x.id];
                        related.push({ id: res.id, relation: "Spouse" });
                        promiseArr.push(
                            this.$store.dispatch("updateDoc", {
                                userId: x.id,
                                dataToUpdate: { related },
                            })
                        );
                    }
                });

                await Promise.all(promiseArr);

                this.showModal = false;
            } finally {
                this.loading = false;
            }
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
    mounted() {
        if(this.userBeingEdited === null) return;
        
        let {name, dob, gender, deceased, dod, description, email, phone, img, related} = this.userBeingEdited;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.deceased = deceased;
        this.dod = dod;
        this.description = description;
        this.email = email;
        this.phone = phone;
        this.imgUrl = img;
        this.related = related;
    }
};
</script>

<style>
.AddNewMember .v-select__selection--comma {
    overflow: visible !important;
}
</style>
