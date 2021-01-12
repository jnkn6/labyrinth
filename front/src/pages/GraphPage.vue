<template>
    <div>
        <sidebar :size="sidebarSize" />
        <flow-graph :domain="domain"/>
    </div>
</template>

<script>

import Sidebar from '@/components/Sidebar'
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
        FlowGraph
    },
    computed: {
        ...mapState([
            'sidebarSize'
        ])
    }
}
</script>
