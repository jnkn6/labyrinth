<template>
    <div>
        <app-header />
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
        AppHeader,
        FlowGraph
    },
}
</script>
