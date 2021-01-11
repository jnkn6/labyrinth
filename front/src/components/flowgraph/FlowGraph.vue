<template>
    <v-container fluid>
        <sidebar :size="sidebarSize" />
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

import Sidebar from './Sidebar'
import ReactFlowGraph from './ReactFlowGraph'

import { uuidv4 } from '@/utils/utils'

import { mapState, mapActions } from 'vuex'

export default {
    name: "FlowGraph",
    props: {
        domain: {
            type: String
        }
    },
    components: {
        Sidebar,
        ReactFlowGraph,
    },
    computed: {
        elements () {
            let nodes = this.domainNodes.concat(this.pageNodes);
            nodes = nodes.concat(this.edges);

            return nodes;
        },
        ...mapState([
            'domainNodes',
            'pageNodes',
            'edges'
        ]),
    },
    data () {
        return {
            isPageOpened: false,
            drag: '',
            sidebarSize: 200
        }
    },
    methods: {
        ...mapActions([
            'fetchDomainNodes',
            'fetchPageNodes',
            'emptyPageNodes',
            'emptyEdges',
        ]),
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
                this.emptyPageNodes();
                this.emptyEdges();
                this.isPageOpened = false;
                return;
            }

            // Add page/edge
            this.fetchPageNodes({
                vue: this,
                domainNode: element
            }).then(() => {
                this.isPageOpened = true;
            })
        }
    },
    created(){
        this.fetchDomainNodes({vue: this, domain: this.domain})
    },
}
</script>
