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
                    <nodetype @changeNodetype="onChangeNodetype"/>

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
import Nodetype from './Nodetype'

import marked from 'marked'
import DOMPurify from 'dompurify'
import Editor from '@/components/Editor'

import { mapActions, mapState } from 'vuex'

export default {
    name: "ComponentInfoCard",
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
        selectedNode: {
            handler(next, prev){
                if(next.data._id === prev.data._id){
                    return;
                }

                this.name = next.data.name;
                this.type = next.data.type;
                this.memo = (next.data.memo === null) ? "" : next.data.memo;

                this.nameModified = next.data.name;
                this.typeModified = next.data.type;
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
        Nodetype,
    },
    data(){
        return {
            workMode: this.mode,

            name: "",
            type: "",
            memo: "",

            nameModified: "",
            typeModified: "",
            memoModified: "",
        }
    },
    computed: {
        ...mapState([
            'selectedNode',
        ]),
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
            'setSelectedNode',
        ]),
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.workMode = modes.EDIT_COMPONENT;
        },
        onSave(){
            this.name = this.nameModified;
            this.type = this.typeModified;
            this.memo = this.memoModified;

            let newComponentData = {
                ...this.selectedNode.data,
                name: this.name,
                type: this.type,
                memo: this.memo,
            };

            this.modifyComponentNode({
                vue: this, 
                oldNode: this.selectedNode,
                newComponentData: newComponentData,
            }).then((newNode) => {
                this.workMode = modes.READ_COMPONENT_INFO;
                this.setSelectedNode(newNode);
            });
        },
        onCancel(){
            this.nameModified = this.name;
            this.typeModified = this.type;
            this.memoModified = this.memo;

            this.workMode = modes.READ_COMPONENT_INFO;
        },
        onMemoInput(val){
            this.memoModified = val;
        },
        onMemoBlur(val){
            this.memoModified = val;
        },
        onChangeNodetype(selectedType){
            this.typeModified = selectedType;
        },
    },
    mounted(){
        this.name = this.selectedNode.data.name;
        this.type = this.selectedNode.data.type;
        this.memo = (this.selectedNode.data.memo === null) ? "" : this.selectedNode.data.memo;
        
        this.nameModified = this.selectedNode.data.name;
        this.typeModified = this.selectedNode.data.type;
        this.memoModified = (this.selectedNode.data.memo === null) ? "" : this.selectedNode.data.memo;
    },
}
</script>
