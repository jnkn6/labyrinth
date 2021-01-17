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
                position: {x: event.clientX - this.sidebarSize, y: event.clientY}
            }).then((newNode) => {
            });

        },
        onElementClick(event, element){

            // if clicked same node, close info card
            if (this.showInfo && element.id === this.selectedNode.id){
                this.mode = null;
                this.selectedNode = null;
                this.showInfo = false;

                return;
            }

            switch(element.type){
                case "domain":
                    this.onDomainClick(event, element);
                    break;
                case "page":
                    this.onPageClick(event, element);
                    break;
            }
        },
        onPageClick(event, element){
            this.mode = modes.READ_PAGE_INFO;
            this.selectedNode = element;
            this.showInfo = true;
        },
        onDomainClick(event, element){
            this.mode = modes.READ_DOMAIN_INFO;
            this.selectedNode = element;
            this.showInfo = true;

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
