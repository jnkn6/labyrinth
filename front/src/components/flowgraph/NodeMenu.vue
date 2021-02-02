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
            <v-list-item>
                <v-list-item-title>
                Open components
                </v-list-item-title>
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
        }
    },
    methods: {
        ...mapActions([
            'fetchPageNodes',
            'emptyPageNodes',
            'emptyEdges',
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
        }
    }
}
</script>
