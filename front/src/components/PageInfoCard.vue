<template>
    <info-card-slot
        @onClose="onClose"
        @onSave="onSave"
        @onEdit="onEdit"
        :isEditing="isEditing"
    >
        <div slot="title">{{title}}</div>
        <div slot="readInfo">
            <p>name: {{name}}</p>
            <p>path: {{path}}</p>
            <p>memo: {{memo}}</p>
        </div>
        <div slot="editInfo">
            <v-text-field
                v-model="name"
                label="Page name"
            />
            <v-text-field
                v-model="path"
                label="Page path"
            />
            <v-textarea
                v-model="memo"
                label="Memo"
                auto-grow
                outlined
            >
                <template v-slot:label>
                    <div>
                        Memo<small>(optional)</small>
                    </div>
                </template>
            </v-textarea>
        </div>
    </info-card-slot>
</template>
<script>

import { modes, modesCategory } from '@/utils/const'
import InfoCardSlot from './InfoCardSlot'

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
                this.infoMode = next;
            }
        },
        node: {
            handler(next, prev){
                this.name = next.data.name;
                this.path = next.data.path;
                this.memo = next.data.memo;

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
            memo: this.node.data.memo,

            infoMode: this.mode,
        }
    },
    computed: {
        title() {
            switch(this.infoMode){
                case modes.CREATE_NEW_PAGE:
                    return 'Create new page';
                case modes.EDIT_PAGE:
                    return "Edit page information";
                case modes.READ_PAGE_INFO:
                    return 'Page informtaion';
            }
        },
        isEditing() {
            return modesCategory.EDIT.includes(this.infoMode)
        },
    },
    methods: {
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.infoMode = modes.EDIT_PAGE;
        },
        onSave(){
            this.infoMode = modes.READ_PAGE_INFO;

        },
    },
}
</script>
