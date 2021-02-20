<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title>Checklist</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Simple/Expand switch -->
            <v-btn-toggle
                v-model="expand"
                rounded
                dense
            >
                <v-btn>Simple</v-btn>
                <v-btn>Expand</v-btn>
            </v-btn-toggle>

            <!-- Menu for change checklist -->
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

        <!-- Checklist treeview and filter -->
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <nodetype v-if="selectedNode.type === 'component'" @changeNodetype="onChangeNodetype"/>

                        <checklist-tree v-if="checklist.length !== 0" :original="checklist"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>

import api from '@/api'

import Nodetype from '@/components/infocard/Nodetype'
import ChecklistTree from './ChecklistTree'

import { mapState } from 'vuex'

export default {
    components: {
        Nodetype,
        ChecklistTree,
    },
    name: "Checklist",
    watch: {
        selectedNode: function(next, prev){
            if(next.data._id === prev.data._id){
                return;
            }

            this.getChecklistFormat();
        },
        selectedMenu: function(){
            this.getChecklistFormat();
        },
        expand: function(){
            this.getChecklistFormat();
        },
        vulFilter: function(){
            this.getChecklistFormat();
        },
    },
    data(){
        return {
            selectedMenu: "wstg_v4_2",
            checkMenu: [],
            expand: 1,

            checklist: [],
            vulFilter: null,
        }
    },
    computed: {
        ...mapState([
            'selectedNode',
        ])
    },
    methods: {
        async getChecklistFormat(){
            const payload = {
                name: this.selectedMenu,
                expand: this.expand,
                vulFilter: this.vulFilter,
            }

            api.post(`/checklist/${this.selectedNode.type}`, payload)
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
        getVulfilter(nodetype){
            const payload = {
                key: this.selectedNode.type,
                checklist: this.selectedMenu,
                nodetype: nodetype,
            };
            api.post('/nodetype/vul', payload)
                .then(res => {
                    this.vulFilter = res.data;
                });
        },
        onChangeNodetype(selectedType){
            this.getVulfilter(selectedType);
        }
    },
    created(){
        this.getChecklistMenu();
        this.getVulfilter(this.selectedNode.data.type);
    },
}
</script>
