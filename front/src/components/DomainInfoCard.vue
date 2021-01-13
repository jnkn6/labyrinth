<template>
    <info-card-slot
        @onClose="onClose"
        @onSave="onSave"
        @onEdit="onEdit"
        :isEditing="isEditing"
    >
        <div slot="title">{{title}}</div>
        <div slot="readInfo">
            <p>url: {{url}}</p>
            <p>memo: {{memo}}</p>
        </div>
        <div slot="editInfo">
            <v-text-field
                v-model="url"
                label="Domain URL"
                disabled
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
    name: "DomainInfoCard",
    props: {
        mode: {
            type: String
        },
        node: {
            type: Object
        }
    },
    components: {
        InfoCardSlot
    },
    data(){
        return {
            url: this.node.data.url,
            memo: this.node.data.memo,
            infoMode: this.mode,
        }
    },
    computed: {
        title() {
            switch(this.infoMode){
                case modes.READ_DOMAIN_INFO:
                    return 'Domain infomation';
                case modes.EDIT_DOMAIN:
                    return 'Edit domain information';
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
            this.infoMode = modes.EDIT_DOMAIN;
        },
        onSave(){
            this.infoMode = modes.READ_DOMAIN_INFO;

        },
    }
}
</script>
