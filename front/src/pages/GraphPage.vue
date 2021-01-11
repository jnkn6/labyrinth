<template>
    <div >
        <flow-graph :domain="domain"/>
    </div>
</template>

<script>

import FlowGraph from '@/components/flowgraph/FlowGraph'

export default {
    name: "GraphPage",
    props: {
        domain: {
            type: String
        }
    },
    components: {
        FlowGraph
    },
}
</script>
