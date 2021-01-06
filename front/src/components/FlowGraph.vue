<template>
    <div>
        <react-flow
            :elements="elements"
            :nodeTypes="nodeTypes"
            :style="graphStyles"
        />
    </div>
</template>

<script>

import ReactFlow from 'react-flow-renderer';

import { DOMAININFO_QUERY } from '@/graphql/domain'

import { DomainNode } from './react-flow-custom/FlowGraphNode'

export default {
    name: "FlowGraph",
    props: {
        domain: {
            type: String
        }
    },
    components: { ReactFlow },
    computed: {
        elements () {
            return this.nodes;
        },
    },
    data () {
        return {
            nodeTypes: {
                domain: DomainNode,
                page: PageNode
            },
            graphStyles: { width: "100%", height: "500px" },
            nodes: []
        }
    },
    apollo: {

        // Init domain node
        domainInfo: {
            query: DOMAININFO_QUERY,
            variables () {
                return { url: this.domain };
            },
            result ({ data, loading }) {
                if (!loading) {
                    this.nodes = [{
                        id: data.domainInfo._id,
                        type: 'domain',
                        data: { ...data.domainInfo },
                        position: {x:100, y:100}
                    }];
                }
            },
        },
    }
}
</script>
