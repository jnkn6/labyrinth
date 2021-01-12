<template>
    <v-card elevation="10">
        <v-card-actions>
            <v-spacer />
            <v-btn x-small dark color="red" @click="onClose">
                <v-icon small dark>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
        <domain-info-card
            v-if="node.type === 'domain'"
            :mode="infoMode"
            :node="node"
        />
        <page-info-card 
            v-if="node.type === 'page'"
            :mode="infoMode"
            :node="node"
        />
        <v-card-actions>
            <v-spacer />
            <v-btn v-if="!isEditing" dark @click="onEdit">
                <v-icon dark>
                    mdi-pencil
                </v-icon>
                Edit
            </v-btn>
            <v-btn v-if="isEditing" dark color="green" @click="onSave">
                <v-icon dark>
                    mdi-checkbox-marked-circle
                </v-icon>
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>

import { modes, modesCategory } from '@/utils/const'

import DomainInfoCard from './DomainInfoCard'
import PageInfoCard from './PageInfoCard'

export default {
    name: "InfoCard",
    components: {
        DomainInfoCard,
        PageInfoCard,
    },
    props: {
        mode: {
            type: String
        },
        node: {
            type: Object
        }
    },
    data(){
        return {
            isEditing: modesCategory.EDIT.includes(this.mode),
            infoMode: this.mode,
        }
    },
    methods: {
        onClose(){
            this.$emit('onClose')
        },
        onEdit(){
            this.isEditing = true;
            if (modesCategory.DOMAIN.includes(this.mode)){
                this.infoMode = modes.EDIT_DOMAIN;
            }
            else if (modesCategory.PAGE.includes(this.mode)){
                this.infoMode = modes.EDIT_PAGE;
            }
        },
        onSave(){
            this.isEditing = false;
            if (modesCategory.DOMAIN.includes(this.mode)){
                this.infoMode = modes.READ_DOMAIN_INFO;
            }
            else if (modesCategory.PAGE.includes(this.mode)){
                this.infoMode = modes.READ_PAGE_INFO;
            }
        }
    }
}
</script>
