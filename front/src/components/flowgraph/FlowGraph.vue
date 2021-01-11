<template>
    <v-container fluid>
        <sidebar :size="sidebarSize" />
        <div :style="{'padding-left': sidebarSize + 'px'}">
            <react-flow-graph
                :elements="graphElements"
                :onElementClick="onElementClick"
                :onDrop="onDrop"
            />
        </div>
    </v-container >
</template>

<script>

import Sidebar from './Sidebar'
import ReactFlowGraph from './ReactFlowGraph'

import { mapState, mapActions, mapGetters } from 'vuex'

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
        ...mapGetters ([
            'graphElements',
        ]),
        ...mapState([
            'domainNode',
            'pageNodes',
            'edges',
            'draggingTag',
        ]),
    },
    data () {
        return {
            isPageOpened: false,
            sidebarSize: 200
        }
    },
    methods: {
        ...mapActions([
            'fetchDomainNode',
            'fetchPageNodes',
            'emptyPageNodes',
            'emptyEdges',
            'createTempNode',
        ]),
        onDrop (event) {
            this.createTempNode({
                type: this.draggingTag,
                position: {x: event.clientX-this.sidebarSize, y: event.clientY}
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
        this.fetchDomainNode({vue: this, domain: this.domain})
    },
}
</script>
