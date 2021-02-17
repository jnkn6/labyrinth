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
                        <nodetype :node="node" @changeNodetype="onChangeNodetype"/>

                        <checklist-tree v-if="checklist.length !== 0" :node="node" :original="checklist"/>
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

export default {
    components: {
        Nodetype,
        ChecklistTree,
    },
    name: "Checklist",
    props: {
        node: {
            type: Object
        }
    },
    watch: {
        node: function(){
            this.getChecklistFormat();
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
        onChangeNodetype(selectedType){
            // get filtered vultype
            console.log(selectedType)
        }
    },
    created(){
        this.getChecklistMenu();
        this.getChecklistFormat();
    },
}
</script>