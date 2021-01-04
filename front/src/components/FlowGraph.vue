<template>
    <div>
        <react-flow :elements="elements" :style="graphStyles" />
    </div>
</template>

<script>

import ReactFlow from 'react-flow-renderer';

import { DOMAININFO_QUERY } from '@/graphql/domain'

export default {
    name: "FlowGraph",
    props: {
        domain: {
            type: String
        }
    },
    components: { ReactFlow },
    data () {
        return {
            elements: [
                { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
                { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
                { id: 'e1-2', source: '1', target: '2', animated: true }
            ],
            graphStyles: { width: "100%", height: "500px" }
        }
    },
    apollo: {
        domainInfo: {
            query: DOMAININFO_QUERY,
            variables() {
                return { url: this.domain }
            }
        }
    },
}
</script>
