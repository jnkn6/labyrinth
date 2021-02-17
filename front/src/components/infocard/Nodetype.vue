<template>
    <v-card outlined>
        <v-container>
            <v-row>
            <v-col
                v-for="key in Object.keys(types)"
                :key="key"
            >
                <v-card elevation=0>
                    <v-card-text>
                        <h3>{{key}}</h3>
                        <v-chip-group
                            v-model="selected"
                            column
                            multiple
                            @change="onChange"
                        >
                            <v-chip
                                v-for="type in types[key]"
                                :key="type.code"
                                :value="type.code"
                                filter
                                outlined
                            >
                                {{type.name}}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>

import api from '@/api'
import { mapState } from 'vuex'

export default {
    name: "Nodetype",
    watch: {
        selectedNode: function (next, prev){
            if(next.data._id === prev.data._id){
                return;
            }

            this.getNodetypes();
            this.selected = [...next.data.type];
        },
    },
    data(){
        return {
            selected: [],
            types: {},
        }
    },
    computed: {
        ...mapState([
            'selectedNode',
        ])
    },
    methods: {
        async getNodetypes(){
            api.post(`/nodetype/${this.selectedNode.type}`)
                .then(res => {
                    this.types = res.data;
                });
        },
        onChange(selected){
            this.$emit('changeNodetype', selected);
        }
    },
    created(){
        this.getNodetypes()
    },
    mounted(){
        this.selected = [...this.selectedNode.data.type];
    }
}
</script>
