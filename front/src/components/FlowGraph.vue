<template>
    <div>
        <react-flow
            :elements="elements"
            :nodeTypes="nodeTypes"
            :style="graphStyles"
            :onElementClick="onElementClick"
        />
    </div>
</template>

<script>

import ReactFlow from 'react-flow-renderer';

import { DOMAININFO_QUERY } from '@/graphql/domain'
import { ALLPAGESINFO_QUERY } from '@/graphql/page'

import { DomainNode, PageNode } from './react-flow-custom/FlowGraphNode'

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
            let nodes = this.domainNodes.concat(this.pageNodes);
            nodes = nodes.concat(this.edgeNodes);

            return nodes;
        },
    },
    data () {
        return {
            nodeTypes: {
                domain: DomainNode,
                page: PageNode
            },
            graphStyles: { width: "100%", height: "500px" },

            domainNodes: [],
            pageNodes: [],
            edgeNodes: [],

            isPageOpened: false
        }
    },
    methods: {
        onElementClick(event, element){
            if (element.type === "domain"){
                this.onDomainClick(event, element);
            }
        },
        onDomainClick(event, element){

            // If already opened, close nodes
            if (this.isPageOpened) {
                this.pageNodes = [];
                this.edgeNodes = [];
                this.isPageOpened = false;
                return;
            }

            // Add page node
            this.$apollo.query({
                query: ALLPAGESINFO_QUERY,
                variables : {
                    domain: element.data._id
                },
            })
            .then(res => {
                let pages = [];
                let edges = [];
                
                let x = element.position.x + 200;
                let y = element.position.y;

                res.data.allPagesInfo.forEach((page, index) => {

                    // Add node
                    pages.push({
                        id: page._id,
                        type: 'page',
                        data: { ...page },
                        position: { x: x, y: y },
                    });

                    y += 100;

                    // Add edge
                    edges.push({
                        id: "e" + element.data._id + "-" + page._id,
                        source: element.data._id,
                        target: page._id
                    });
                });

                this.pageNodes = this.pageNodes.concat(pages);
                this.$nextTick(function () {
                    this.edgeNodes = this.edgeNodes.concat(edges);
                })

                this.isPageOpened = true;
            })
            .catch(err => {console.log(err);})
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
                    this.domainNodes = [{
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
