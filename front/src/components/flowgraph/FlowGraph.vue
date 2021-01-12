<template>
    <v-container fluid>
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
            'sidebarSize',
        ]),
    },
    data () {
        return {
            isPageOpened: false,
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
                vue: this,
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
