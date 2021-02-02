<template>
    <v-container fluid>
        <div>
            <react-flow-graph
                :elements="graphElements"
                :onElementClick="onElementClick"
                :onDrop="onDrop"
                :onNodeContextMenu="onNodeContextMenu"
            />
            <v-menu
                v-model="showNodeMenu"
                :position-x="nodeMenuX"
                :position-y="nodeMenuY"
                absolute
            >
                <node-menu
                    :selectedMenuNode="selectedMenuNode"
                    :positionX="nodeMenuX"
                    :positionY="nodeMenuY"
                />
            </v-menu>
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

import InfoCard from '@/components/infocard/InfoCard'
import ReactFlowGraph from './ReactFlowGraph'
import NodeMenu from './NodeMenu'

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
        NodeMenu,
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
            showInfo: false,
            mode: null,
            selectedNode: null,

            showNodeMenu: false,
            nodeMenuX: 0,
            nodeMenuY: 0,
            selectedMenuNode: null,
        }
    },
    methods: {
        ...mapActions([
            'fetchDomainNode',
            'createNode',
        ]),
        onDrop (event) {
            this.createNode({
                vue: this,
                type: this.draggingTag,
                position: {x: event.clientX, y: event.clientY - 48 /* app bar size */}
            }).then((newNode) => {
                // Open editor to set info
                switch(this.draggingTag){
                    case "page":
                        this.mode = modes.EDIT_PAGE;
                }

                this.selectedNode = newNode;
                this.showInfo = true;
            });

        },
        onNodeContextMenu(event, element){
            event.preventDefault();
            this.nodeMenuX = event.clientX;
            this.nodeMenuY = event.clientY;
            this.selectedMenuNode = element;
            this.showNodeMenu = true;
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
                case "component":
                    this.onComponentClick(event, element);
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
        },
        onComponentClick(event, element){
            this.mode = modes.READ_COMPONENT_INFO;
            this.selectedNode = element;
            this.showInfo = true;
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
