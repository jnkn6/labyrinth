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
                        @click="name = item.code"
                    >
                    <v-list-item-content>{{ item.name }}</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-card-text>
            <v-treeview v-if="!isEditing"
                :items="checklist"
                item-key="code"
                selectable
                selected-color="#ff2a6d"
                selection-type="leaf"
                dense
                shaped
                hoverable
            ></v-treeview>
        </v-card-text>
    </v-card>
</template>
<script>

import api from '@/api'

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
        node: {
            handler(next, prev){
                this.fetchChecklist();
            }
        },
        name: {
            handler(next, prev){
                this.getChecklistFormat();
            }
        },
        expand: {
            handler(next, prev){
                this.getChecklistFormat();
            }
        },
    },
    data(){
        return {
            name: "wstg",
            checkMenu: [],
            expand: 1,

            checklist: [],
            done: {},
            deactivated: [],
        }
    },
    methods: {
        getChecklistFormat(){
            const payload = {
                name: this.name,
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
                this.deactivated = res.data.checklist.deactivated;
            });
        },
    },
    created(){
        this.getChecklistMenu();
        this.getChecklistFormat();
        this.fetchChecklist();
    },
}
</script>
