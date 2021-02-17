<template>
    <info-card-slot
        @onClose="onClose"
        @onSave="onSave"
        @onEdit="onEdit"
        @onCancel="onCancel"
        :isEditing="isEditing"
    >
        <div slot="title">{{title}}</div>
        <div slot="readInfo">
            <p>name: {{name}}</p>
            <p>path: {{path}}</p>
            <v-card>
                <v-card-title>Memo</v-card-title>
                <v-card-text v-html="compiledMemo" />
            </v-card>
        </div>
        <div slot="editInfo">
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="nameModified"
                        label="Page name"
                    />
                    <v-text-field
                        v-model="pathModified"
                        label="Page path"
                    />
                    <v-card>
                        <v-card-title>Memo</v-card-title>
                        <v-card-text>
                        <editor :value="memoModified" @input="onMemoInput" @blur="onMemoBlur"/>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </info-card-slot>
</template>
<script>

import { modes, modesCategory } from '@/utils/const'
import InfoCardSlot from './InfoCardSlot'

import marked from 'marked'
import DOMPurify from 'dompurify'
import Editor from '@/components/Editor'

import { mapActions, mapState } from 'vuex'

export default {
    name: "PageInfoCard",
    props: {
        mode: {
            type: String
        },
    },
    watch: {
        mode:{
            handler(next, prev){
                this.workMode = next;
            }
        },
        selectedNode: function (next, prev){
            if(next.data._id === prev.data._id){
                return;
            }

            this.name = next.data.name;
            this.path = next.data.path;
            this.memo = (next.data.memo === null) ? "" : next.data.memo;

            this.nameModified = next.data.name;
            this.pathModified = next.data.path;
            this.memoModified = (next.data.memo === null) ? "" : next.data.memo;

            // If mode watcher not triggerd
            if (this.mode !== this.workMode){
                this.workMode = this.mode;
            }
        },
    },
    components: {
        InfoCardSlot,
        Editor,
    },
    data(){
        return {
            name: "",
            path: "",
            memo: "",

            workMode: this.mode,

            nameModified: "",
            pathModified: "",
            memoModified: "",
        }
    },
    computed: {
        ...mapState([
            'selectedNode',
        ]),
        title() {
            switch(this.workMode){
                case modes.EDIT_PAGE:
                    return "Edit page information";
                case modes.READ_PAGE_INFO:
                    return 'Page informtaion';
            }
        },
        isEditing() {
            return modesCategory.EDIT.includes(this.workMode);
        },
        compiledMemo() {
            let renderedHTML = marked(this.memo);
            return DOMPurify.sanitize(renderedHTML, {
                USE_PROFILES: {html: true}
            });
        }
    },
    methods: {
        ...mapActions([
            'modifyPageNode',
            'setSelectedNode',
        ]),
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.workMode = modes.EDIT_PAGE;
        },
        onSave(){
            this.name = this.nameModified;
            this.path = this.pathModified;
            this.memo = this.memoModified;

            let newPageData = {
                ...this.selectedNode.data,
                name: this.name,
                path: this.path,
                memo: this.memo,
            };

            this.modifyPageNode({
                vue: this, 
                oldNode: this.selectedNode,
                newPageData: newPageData,
            }).then((newNode) => {
                this.workMode = modes.READ_PAGE_INFO;
                this.setSelectedNode(newNode);
            });
        },
        onCancel(){
            this.nameModified = this.name;
            this.pathModified = this.path;
            this.memoModified = this.memo;

            this.workMode = modes.READ_PAGE_INFO;
        },
        onMemoInput(val){
            this.memoModified = val;
        },
        onMemoBlur(val){
            this.memoModified = val;
        },
    },
    mounted(){
        this.name = this.selectedNode.data.name;
        this.path = this.selectedNode.data.path;
        this.memo = (this.selectedNode.data.memo === null) ? "" : this.selectedNode.data.memo;

        this.nameModified = this.selectedNode.data.name;
        this.pathModified = this.selectedNode.data.path;
        this.memoModified = (this.selectedNode.data.memo === null) ? "" : this.selectedNode.data.memo;
    },
}
</script>
