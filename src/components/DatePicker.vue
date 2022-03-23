<template>
    <v-menu ref="menu" v-model="showMenu" :return-value.sync="returnValToUse" :close-on-content-click="false" offset-y min-width="290px" >
        <template v-slot:activator="{ on, attrs}">
            <v-text-field
                :class="inputClass"
                dense
                :rules="rules"
                outlined
                :hide-details="hideDetails"
                :value="localDate"
                prepend-inner-icon="mdi-calendar"
                readonly
                clearable
                @click:clear="handleClearClick"
                :label="label"
                v-on="on"
                v-bind="attrs"
                :disabled="disabled"
            ></v-text-field>
        </template>
        <v-date-picker class="customDatePicker" @change="handleChange" :range="range" :max="max" :min="min" clearable v-model="localDate">
            <template v-if="range">
                <v-spacer />
                <v-btn text color="primary" @click="showMenu = false" >
                    Cancel
                </v-btn>
                <v-btn text color="primary" @click="handleOkClick" :disabled="localDate.length < 2" >
                    OK
                </v-btn>
            </template>
        </v-date-picker>
    </v-menu>
</template>

<script>
import moment from 'moment';

export default {
    name: 'DatePicker',
    props: {
        value: {required: true},
        label: String,
        inputClass: {required: false},
        disableFuture: {type: Boolean, default: false},
        hideDetails: {default: 'auto'},
        disablePast: {type: Boolean, default: false},
        maxDate: String,
        minDate: String,
        disabled: {type: Boolean, default: false},
        range: {type: Boolean, default: false}, // if you make it a range picker, then v-model needs to be an array.
        rules:{type:Array,default:()=>[]} // to apply validation rules
    },
    data() {
        return {
            showMenu: false,
            localDate: [],
        }
    },
    computed: {
        returnValToUse: {
            get() {
                return this.localDate;
            },
            set(val) {
                if(!this.range) return;

                this.localDate = val;
            }
        },
        dateVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        max() {
            if(this.disableFuture === true) return moment().format('YYYY-MM-DD');
            return this.maxDate;
        },
        min() {
            if(this.disablePast === true) return moment().format('YYYY-MM-DD');
            return this.minDate;
        }
    },
    methods: {
        handleOkClick() {
            this.localDate.sort();
            this.$refs.menu.save(this.localDate);
            this.dateVal = this.localDate;
        },
        handleChange() {
            if(this.range) {
                return;
            }

            this.dateVal = this.localDate;
            this.showMenu = false;
        },
        handleClearClick() {
            if(this.range) {
                this.dateVal = [];
                return;
            }

            this.dateVal = null;
        }
    },
    watch: {
        showMenu(val) {
            if(val === true) {
                this.localDate = this.dateVal;
            }
        }
    }
}
</script>

<style>
    .customDatePicker .v-date-picker-table td {
        border: unset;
    }
</style>