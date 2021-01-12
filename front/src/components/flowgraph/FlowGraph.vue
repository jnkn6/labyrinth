<template>
    <v-container fluid>
        <div :style="{'padding-left': sidebarSize + 'px'}">
            <react-flow-graph
                :elements="graphElements"
                :onElementClick="onElementClick"
                :onDrop="onDrop"
            />
            <info-card
                v-if="showInfo"
                :mode="mode" 
                :node="selectedNode"
                @onClose="onCloseInfo"
            />
        </div>
    </v-container >
</template>

<script>

import InfoCard from '@/components/InfoCard'
import ReactFlowGraph from './ReactFlowGraph'

import { mapState, mapActions, mapGetters } from 'vuex'

import { modes } from '@/utils/const'

export default {
    name: "FlowGraph",
    props: {
        domain: {
            type: String
        }
    },
    components: {
        ReactFlowGraph,
        InfoCard,
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
            showInfo: false,
            mode: null,
            selectedNode: null,
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
        },
        onCloseInfo(){
            this.showInfo = false;
            this.mode = null;
            this.selectedNode = null;
        }
    },
    created(){
        this.fetchDomainNode({vue: this, domain: this.domain})
    },
}
</script>
