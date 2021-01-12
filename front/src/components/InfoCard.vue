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
    </v-card>
</template>
<script>

import { modes } from '@/utils/const'

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
            infoMode: this.mode,
        }
    },
    methods: {
        onClose(){
            this.$emit('onClose')
        },
    }
}
</script>
