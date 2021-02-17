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
            <p>url: {{url}}</p>
            <p>memo: {{memo}}</p>
            <v-card>
                <v-card-title>Memo</v-card-title>
                <v-card-text v-html="compiledMemo" />
            </v-card>
        </div>
        <div slot="editInfo">
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="url"
                        label="Domain URL"
                        disabled
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
    name: "DomainInfoCard",
    props: {
        mode: {
            type: String
        },
    },
    components: {
        InfoCardSlot,
        Editor,
    },
    watch: {
        mode:{
            handler(next, prev){
                this.workMode = next;
            }
        },
        selectedNode: function(next, prev){
            if(next.data._id === prev.data._id){
                return;
            }

            this.url = next.data.url;
            this.memo = next.data.memo;

        },
    },
    data(){
        return {
            workMode: this.mode,

            url: "",
            memo: "",

            memoModified: "",
        }
    },
    computed: {
        ...mapState([
            'selectedNode',
        ]),
        title() {
            switch(this.workMode){
                case modes.READ_DOMAIN_INFO:
                    return 'Domain infomation';
                case modes.EDIT_DOMAIN:
                    return 'Edit domain information';
            }
        },
        isEditing() {
            return modesCategory.EDIT.includes(this.workMode)
        },
        compiledMemo() {
            let renderedHTML = marked(this.memo);
            return DOMPurify.sanitize(renderedHTML, {
                USE_PROFILES: {html: true}
            });
        },
    },
    methods: {
        ...mapActions([
            'modifyDomainNode',
            'setSelectedNode',
        ]),
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.workMode = modes.EDIT_DOMAIN;
        },
        onSave(){
            this.memo = this.memoModified;
            let newDomainData = {
                ...this.selectedNode.data,
                memo: this.memo,
            };

            this.modifyDomainNode({
                vue: this, 
                oldNode: this.selectedNode,
                newDomainData: newDomainData,
            }).then((newNode) => {
                this.workMode = modes.READ_DOMAIN_INFO;
                this.setSelectedNode(newNode);
            });
        },
        onCancel(){
            this.memoModified = this.memo;

            this.workMode = modes.READ_DOMAIN_INFO;
        },
        onMemoInput(val){
            this.memoModified = val;
        },
        onMemoBlur(val){
            this.memoModified = val;
        },
    },
    mounted(){
        this.url = this.selectedNode.data.url;
        this.memo = (this.selectedNode.data.memo === null) ? "" : this.selectedNode.data.memo;

        this.memoModified = (this.selectedNode.data.memo === null) ? "" : this.selectedNode.data.memo;
    },
}
</script>
