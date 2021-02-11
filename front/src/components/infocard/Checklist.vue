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
                v-if="!isEditing"
                :key="Math.random()"
                open-all
                :items="checklist"
                item-key="code"
                selectable
                selected-color="#ff2a6d"
                selection-type="leaf"
                dense
                shaped
                hoverable
                v-model="done"
                return-object
            ></v-treeview>
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
} from '@/graphql/checklist'

export default {
    name: "Checklist",
    props: {
        isEditing: {
            type: Boolean
        },
        node: {
            type: Object
        }
    },
    watch: {
        node: function(){
            this.fetchChecklist();
        },
        selectedMenu: function(){
            this.getChecklistFormat();
        },
        expand: function(){
            this.getChecklistFormat();
        },
    },
    data(){
        return {
            selectedMenu: "wstg_v4_2",
            checkMenu: [],
            expand: 1,

            checklist: [],
            done: [],
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

                this.done.forEach(element => {
                    this.addDoneDate(this.checklist, element.code, element.date);
                });

                this.deactivated = res.data.checklist.deactivated;
            });
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
                    element.date = moment(date);

                    const dateStr =element.date.format('YYYY-MM-DD HH:mm:ss');
                    element.name = element.name + " (Last: " + dateStr + ")"
                });
            }
        },
    },
    created(){
        this.getChecklistMenu();
        this.getChecklistFormat()
            .then(() => {
                this.fetchChecklist();
            })
    },
}
</script>
