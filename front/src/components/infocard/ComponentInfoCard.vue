<template>
    <info-card-slot
        @onClose="onClose"
        @onSave="onSave"
        @onEdit="onEdit"
        @onCancel="onCancel"
        :isEditing="isEditing"
        :node="node"
    >
        <div slot="title">{{title}}</div>
        <div slot="readInfo">
            <p>name: {{name}}</p>
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
                        label="Component name"
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

import { mapActions } from 'vuex'

export default {
    name: "ComponentInfoCard",
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
                this.memo = (next.data.memo === null) ? "" : next.data.memo;

                this.nameModified = next.data.name;
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
        Editor,
    },
    data(){
        return {
            name: this.node.data.name,
            memo: (this.node.data.memo === null) ? "" : this.node.data.memo,

            workMode: this.mode,

            nameModified: this.node.data.name,
            memoModified: (this.node.data.memo === null) ? "" : this.node.data.memo,
        }
    },
    computed: {
        title() {
            switch(this.workMode){
                case modes.EDIT_COMPONENT:
                    return "Edit component information";
                case modes.READ_COMPONENT_INFO:
                    return 'Component informtaion';
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
            'modifyComponentNode',
        ]),
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.workMode = modes.EDIT_COMPONENT;
        },
        onSave(){
            this.name = this.nameModified;
            this.memo = this.memoModified;

            let newComponentData = {
                ...this.node.data,
                name: this.name,
                memo: this.memo,
            };

            this.modifyComponentNode({
                vue: this, 
                oldNode: this.node,
                newComponentData: newComponentData,
            }).then(() => {
                this.workMode = modes.READ_COMPONENT_INFO;
            });
        },
        onCancel(){
            this.nameModified = this.name;
            this.memoModified = this.memo;

            this.workMode = modes.READ_COMPONENT_INFO;
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
