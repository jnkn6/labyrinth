<template>
<div>
    <v-list v-if="selectedMenuNode.type === 'domain'">
        <v-subheader>Domain Menu</v-subheader>
        <v-list-item @click="onClickOpenPages">
            <v-list-item-avatar>
                <v-icon >mdi-file</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!isPageOpened">
                Open pages
            </v-list-item-content>
            <v-list-item-content v-else>
                Close pages
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onClickAddPage">
            <v-list-item-avatar>
                <v-icon >mdi-file-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                Add page
            </v-list-item-content>
        </v-list-item>
    </v-list>
    <v-list v-else-if="selectedMenuNode.type === 'page'">
        <v-subheader>Page Menu</v-subheader>
        <v-list-item @click="onClickOpenComponents">
            <v-list-item-avatar>
                <v-icon >mdi-view-grid</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!componentOpendPages.includes(selectedMenuNode.id)">
                Open components
            </v-list-item-content>
            <v-list-item-content v-else>
                Close components
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onClickAddComponent">
            <v-list-item-avatar>
                <v-icon >mdi-view-grid-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                Add Component
            </v-list-item-content>
        </v-list-item>
    </v-list>
    <v-list v-else-if="selectedMenuNode.type === 'component'">
        <v-subheader>Component Menu</v-subheader>
        <v-list-item @click="onClickAddComponent">
            <v-list-item-avatar>
                <v-icon >mdi-view-grid-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                Add Component
            </v-list-item-content>
        </v-list-item>
    </v-list>
</div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
    name: "NodeMenu",
    props: {
        selectedMenuNode : {
            type: Object
        },
        positionX : {
            type: Number
        },
        positionY : {
            type: Number
        },
    },
    data(){
        return {
            isPageOpened: false,
            componentOpendPages: [],
        }
    },
    methods: {
        ...mapActions([
            'createNode',
            'createComponentNode',
            'fetchPageNodes',
            'fetchComponentNodes',
            'emptyPageNodes',
            'emptyEdges',
            'closeComponentNodes',
        ]),
        onClickOpenPages(){
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
                domainNode: this.selectedMenuNode
            }).then(() => {
                this.isPageOpened = true;
            })
        },
        onClickAddPage(){
            this.createNode({
                vue: this,
                type: 'page',
                position: {x: this.positionX, y: this.positionY}
            }).then((newNode) => {

            });
        },
        onClickOpenComponents(){
            // If already opened, close nodes
            const index = this.componentOpendPages.indexOf(this.selectedMenuNode.id)
            if (index > -1){
                this.componentOpendPages.splice(index, 1)
                this.closeComponentNodes(this.selectedMenuNode.id);
                return;
            }

            // Add Component/edge
            this.fetchComponentNodes({
                vue: this,
                pageNode: this.selectedMenuNode
            }).then(() => {
                this.componentOpendPages.push(this.selectedMenuNode.id)
            })
        },
        onClickAddComponent(){
            const isParentComponent = (this.selectedMenuNode.type === 'component');
            let pageId = null;
            let parentId = null;

            if (!isParentComponent){
                pageId = this.selectedMenuNode.id;
            }
            else{
                // If it's nested component
                pageId = this.selectedMenuNode.data.page;
                parentId = this.selectedMenuNode.id;
            }

            this.createComponentNode({
                vue: this,
                type: 'component',
                position: {x: this.positionX, y: this.positionY},
                pageId: pageId,
                parentId: parentId
            }).then((newNode) => {

            });
        },
    }
}
</script>
