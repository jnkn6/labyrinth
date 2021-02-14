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

export default {
    name: "Nodetype",
    props: {
        node: {
            type: Object
        }
    },
    watch: {
        node: function(next){
            this.getNodetypes();
            this.selected = next.data.type;
        },
    },
    data(){
        return {
            selected: [],
            types: {},
        }
    },
    methods: {
        async getNodetypes(){
            api.post(`/nodetype/${this.node.type}`)
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
    }
}
</script>
