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
                <v-card-text id="editorResult" v-html="compiledMarkdown" />
            </v-card>
        </div>
        <div slot="editInfo">
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="name"
                        label="Page name"
                    />
                    <v-text-field
                        v-model="path"
                        label="Page path"
                    />

                    <v-row>
                        <v-col cols="6">
                            <v-textarea
                                :value="memo"
                                id="editor"
                                label="Memo"
                                outlined
                                @input="update"
                            >
                                <template v-slot:label>
                                    <div>
                                        Memo<small>(optional)</small>
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                        <v-col cols="6">
                            <v-card>
                                <v-card-title>Memo preview</v-card-title>
                                <v-card-text id="editorResult" v-html="compiledMarkdown" />
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </info-card-slot>
</template>
<script>

import { modes, modesCategory } from '@/utils/const'
import InfoCardSlot from './InfoCardSlot'

import marked from 'marked'
import _ from 'lodash'
import validator from 'validator'

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
                this.memo = next.data.memo;

                // If mode watcher not triggerd
                if (this.mode !== this.workMode){
                    this.workMode = this.mode;
                }
            }
        },
    },
    components: {
        InfoCardSlot
    },
    data(){
        return {
            name: this.node.data.name,
            path: this.node.data.path,
            memo: (this.node.data.memo === null) ? "" : this.node.data.memo,

            workMode: this.mode,

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
        compiledMarkdown() {
            return marked(validator.escape(this.memo));
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
        update: _.debounce(function(e) {
                    this.memo = e
                }, 300)
    },
}
</script>
