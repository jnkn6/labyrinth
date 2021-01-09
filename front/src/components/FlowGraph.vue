<template>
    <v-container fluid>
        <flow-graph-sidebar :size="sidebarSize" @onDragTag="onDragTag" />
        <div :style="{'padding-left': sidebarSize + 'px'}">
            <react-flow-graph
                :elements="elements"
                :onElementClick="onElementClick"
                :onDrop="onDrop"
            />
        </div>
    </v-container >
</template>

<script>

import FlowGraphSidebar from './FlowGraphSidebar'
import ReactFlowGraph from './FlowGraphGraph'

import { DOMAININFO_QUERY } from '@/graphql/domain'
import { ALLPAGESINFO_QUERY } from '@/graphql/page'

import { uuidv4 } from '@/utils/utils'


async function fetchPages (apollo, domainId, domainNodeX, domainNodeY) {
    let pages = [];
    let edges = [];

    let result = apollo.query({
        query: ALLPAGESINFO_QUERY,
        variables : {
            domain: domainId
        },
    })
    .then(res => {
        let x = domainNodeX + 200;
        let y = domainNodeY;

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
                id: "e" + domainId + "-" + page._id,
                source: domainId,
                target: page._id
            });
        });

        return {pages: pages, edges: edges}
    })
    .catch(err => {console.log(err);})

    return result;
}

export default {
    name: "FlowGraph",
    props: {
        domain: {
            type: String
        }
    },
    components: {
        FlowGraphSidebar,
        ReactFlowGraph,
    },
    computed: {
        elements () {
            let nodes = this.domainNodes.concat(this.pageNodes);
            nodes = nodes.concat(this.edgeNodes);

            return nodes;
        },
    },
    data () {
        return {
            domainNodes: [],
            pageNodes: [],
            edgeNodes: [],

            isPageOpened: false,
            drag: '',
            sidebarSize: 200
        }
    },
    methods: {
        onDragTag (payload) {
            this.drag = payload.name
        },
        onDrop (event) {
            let id = uuidv4() // this ID is temporary, real ID will be made by DB.
            let data = {};

            switch (this.drag){
                case "page":
                    data = { _id: id, name: "new_page", path: "" };
                    break;
            }

            this.pageNodes.push({
                id: id,
                type: this.drag,
                position: { x: event.clientX - this.sidebarSize, y: event.clientY},
                data: data,
            });

        },
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
            fetchPages(this.$apollo, element.data._id, element.position.x, element.position.y)
                .then(res => {
                    this.pageNodes = this.pageNodes.concat(res.pages)
                    this.$nextTick(() => {
                        this.edgeNodes = this.edgeNodes.concat(res.edges);
                        this.isPageOpened = true;
                    })
                })
                .catch(err => {console.log(err)})
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
