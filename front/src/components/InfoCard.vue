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
    </v-card>
</template>
<script>

import { modes } from '@/utils/const'

import DomainInfoCard from './DomainInfoCard'
export default {
    name: "InfoCard",
    components: {
        DomainInfoCard,
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
