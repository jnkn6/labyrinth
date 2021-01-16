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
                <v-card-text id="editorResult" v-html="compiledMemo" />
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
                        <memo-editor :value="memoModified" @input="onMemoInput" @blur="onMemoBlur"/>
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
import MemoEditor from './MemoEditor'

export default {
    name: "PageInfoCard",
    props: {
        mode: {
            type: String
        },
        node: {
            type: Object
        },
    },
    watch: {
        mode:{
            handler(next, prev){
                this.workMode = next;
            }
        },
        node: {
            handler(next, prev){
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
            }
        },
    },
    components: {
        InfoCardSlot,
        MemoEditor,
    },
    data(){
        return {
            name: this.node.data.name,
            path: this.node.data.path,
            memo: (this.node.data.memo === null) ? "" : this.node.data.memo,

            workMode: this.mode,

            nameModified: this.node.data.name,
            pathModified: this.node.data.path,
            memoModified: (this.node.data.memo === null) ? "" : this.node.data.memo,
        }
    },
    computed: {
        title() {
            switch(this.workMode){
                case modes.CREATE_NEW_PAGE:
                    return 'Create new page';
                case modes.EDIT_PAGE:
                    return "Edit page information";
                case modes.READ_PAGE_INFO:
                    return 'Page informtaion';
            }
        },
        isEditing() {
            return modesCategory.EDIT.includes(this.workMode)
        },
        compiledMemo() {
            return marked(this.memo);
        }
    },
    methods: {
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.workMode = modes.EDIT_PAGE;
        },
        onSave(){
            this.workMode = modes.READ_PAGE_INFO;

        },
        onCancel(){
            this.workMode = modes.READ_PAGE_INFO;
        },
        onMemoInput(val){
            this.memoModified = val;
        },
        onMemoBlur(val){
            this.memoModified = val;
        },
    },
}
</script>
