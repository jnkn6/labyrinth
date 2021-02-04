<template>
    <div>
        <app-header />
        <v-container fluid>
            <v-row>
                <v-col v-if="graphElements.length !== 0">
                    <flow-graph :domain="domain"/>
                </v-col>
                <v-col v-else align="center">
                    <domain-add-button :domain="domain"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import AppHeader from '@/components/AppHeader'
import FlowGraph from '@/components/flowgraph/FlowGraph'
import DomainAddButton from '@/components/DomainAddButton'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: "GraphPage",
    props: {
        domain: {
            type: String
        }
    },
    components: {
        AppHeader,
        FlowGraph,
        DomainAddButton,
    },
    computed: {
        ...mapGetters ([
            'graphElements',
        ]),
    },
    methods: {
        ...mapActions([
            'fetchDomainNode',
        ]),
    },
    created(){
        this.fetchDomainNode({vue: this, domain: this.domain})
    },
}
</script>
