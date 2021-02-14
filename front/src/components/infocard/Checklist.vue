<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title>Checklist</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn-toggle
                v-model="expand"
                rounded
                dense
            >
                <v-btn>Simple</v-btn>
                <v-btn>Expand</v-btn>
            </v-btn-toggle>

            <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, i) in checkMenu"
                        :key="i"
                        @click="selectedMenu = item.code"
                    >
                    <v-list-item-content>{{ item.name }}</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-card-text>
            <v-treeview
                :key="Math.random()"
                open-all
                :items="checklist"
                item-key="code"
                selectable
                selected-color="#ff2a6d"
                selection-type="leaf"
                item-disabled="deactivated"
                dense
                shaped
                hoverable
                v-model="done"
                return-object
            >
                <template #append="{item}">
                    <v-btn
                        v-if="deactivated.includes(item.code)"
                        icon
                        @click="onClickActivate(item)"
                    >
                        <v-icon>mdi-eye-check-outline</v-icon>
                    </v-btn>
                    <v-btn
                        v-else
                        icon
                        @click="onClickDeactivate(item)"
                    >
                        <v-icon>mdi-eye-off-outline </v-icon>
                    </v-btn>
                </template>
            </v-treeview>
        </v-card-text>
    </v-card>
</template>
<script>

import api from '@/api'
import _ from 'lodash'

import moment from 'moment'
import 'moment-timezone'

import {
    CHECKLIST_QUERY,
    CHECK_MUTATION,
    UNCHECK_MUTATION,
    ACTIVATE_MUTATION,
    DEACTIVATE_MUTATION,
} from '@/graphql/checklist'

export default {
    name: "Checklist",
    props: {
        node: {
            type: Object
        }
    },
    watch: {
        node: function(){
            this.getChecklistFormat();
            this.doneFirstWatch = false;
        },
        selectedMenu: function(){
            this.getChecklistFormat();
            this.doneFirstWatch = false;
        },
        expand: function(){
            this.getChecklistFormat();
            this.doneFirstWatch = false;
        },
        done: function(next, prev){
            if(!this.doneFirstWatch){
                this.doneFirstWatch = true;
                return;
            }
            if (next.length > prev.length){
                // If Check
                // Get new checked list
                let newCheck = _.differenceBy(next, prev, 'code');
                this.onClickCheck(newCheck);
            }
            else{
                // If Uncheck
                let unCheck = _.differenceBy(prev, next, 'code');
                this.onClickUncheck(unCheck);
            }
        }
    },
    data(){
        return {
            selectedMenu: "wstg_v4_2",
            checkMenu: [],
            expand: 1,

            checklist: [],
            done: [],
            timestamp: [],

            doneFirstWatch: false,
            deactivated: [],
        }
    },
    methods: {
        async getChecklistFormat(){
            const payload = {
                name: this.selectedMenu,
                expand: this.expand
            }

            api.post(`/checklist/${this.node.type}`, payload)
                .then(res => {
                    this.checklist = res.data;
                    this.fetchChecklist()
                });
        },
        getChecklistMenu(){
            api.get('/checklist/conf.json')
                .then(res => {
                    this.checkMenu = res.data;
                });
        },
        fetchChecklist(){

            // get done/deactivated list
            this.$apollo.query({
                query: CHECKLIST_QUERY,
                variables : {
                    id: this.node.data.checklist,
                },
            }).then(res => {
                this.done = JSON.parse(res.data.checklist.done);
                this.timestamp = JSON.parse(res.data.checklist.timestamp);

                this.timestamp.forEach(element => {
                    this.addDoneDate(this.checklist, element.code, element.date);
                });

                this.deactivated = res.data.checklist.deactivated;
                this.deactivated.forEach(code => {
                    this.addDeactivated(this.checklist, code);
                });
            });
        },
        addDeactivated(parent, code){
            let child = _.filter(parent, {children: [{code: code}]});

            if (child.length !== 0){
                child.forEach(element => {
                    if (element.children){
                        this.addDeactivated(element.children, code)
                    }
                });
            }
            else{
                let child = _.filter(parent, {code: code});
                child.forEach(element => {
                    element.deactivated = true;
                });
            }
        },
        addDoneDate(parent, code, date){
            let child = _.filter(parent, {children: [{code: code}]});

            if (child.length !== 0){
                child.forEach(element => {
                    if (element.children){
                        this.addDoneDate(element.children, code, date)
                    }
                });
            }
            else{
                let child = _.filter(parent, {code: code});
                child.forEach(element => {
                    this.setElementDate(element, date)
                });
            }
        },
        setElementDate(element, date){
            // If first done
            if(element.date === undefined){
                element.originalName = element.name;
            }

            element.date = moment(date);

            const dateStr = element.date.format('YYYY-MM-DD HH:mm:ss');
            element.name = element.originalName + " (Last: " + dateStr + ")"
        },
        onClickCheck(checked){
            let codes = _.map(checked, 'code');

            this.$apollo.mutate({
                mutation: CHECK_MUTATION,
                variables : {
                    done:{
                        _id: this.node.data.checklist,
                        codes: codes
                    }
                },
            }).then(res => {
                // Update date
                checked.forEach(element => {
                    if (res.data.check.codes.includes(element.code)){
                        this.setElementDate(element, res.data.check.date)
                    }
                });
            });
        },
        onClickUncheck(unchecked){
            let codes = _.map(unchecked, 'code');

            this.$apollo.mutate({
                mutation: UNCHECK_MUTATION,
                variables : {
                    undo:{
                        _id: this.node.data.checklist,
                        codes: codes
                    }
                },
            }).then(res => {
 
            });
        },
        onClickDeactivate(item){
            this.$apollo.mutate({
                mutation: DEACTIVATE_MUTATION,
                variables : {
                    deactivate:{
                        _id: this.node.data.checklist,
                        codes: [item.code]
                    }
                },
            }).then(res => {
                this.deactivated = _.union(this.deactivated, res.data.deactivate);
                item.deactivated = true;

                // force to rerender
                this.$forceUpdate();
            });
        },
        onClickActivate(item){
            this.$apollo.mutate({
                mutation: ACTIVATE_MUTATION,
                variables : {
                    activate:{
                        _id: this.node.data.checklist,
                        codes: [item.code]
                    }
                },
            }).then(res => {
                this.deactivated = _.difference(this.deactivated, res.data.activate);
                item.deactivated = false;

                // force to rerender
                this.$forceUpdate();
            });
        },
    },
    created(){
        this.getChecklistMenu();
        this.getChecklistFormat();
    },
}
</script>
