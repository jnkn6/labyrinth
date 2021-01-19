<template>
    <div>
        <app-header />
        <sidebar :size="sidebarSize" />
        <flow-graph :domain="domain"/>
    </div>
</template>

<script>

import AppHeader from '@/components/AppHeader'
import FlowGraph from '@/components/flowgraph/FlowGraph'

import { mapState } from 'vuex'

export default {
    name: "GraphPage",
    props: {
        domain: {
            type: String
        }
    },
    components: {
        Sidebar,
        AppHeader,
        FlowGraph
    },
    computed: {
        ...mapState([
            'sidebarSize'
        ])
    }
}
</script>
