<template>
    <div>
        <domain-info-card
            v-if="node.type === 'domain'"
            :mode="mode"
            :node="node"
            @onClose="$emit('onClose')"
        />
        <page-info-card 
            v-if="node.type === 'page'"
            :mode="mode"
            :node="node"
            @onClose="$emit('onClose')"
        />
        <component-info-card 
            v-if="node.type === 'component'"
            :mode="mode"
            :node="node"
            @onClose="$emit('onClose')"
        />
    </div>
</template>
<script>

import { modes, modesCategory } from '@/utils/const'

import DomainInfoCard from './DomainInfoCard'
import PageInfoCard from './PageInfoCard'
import ComponentInfoCard from './ComponentInfoCard'

export default {
    name: "InfoCard",
    components: {
        DomainInfoCard,
        PageInfoCard,
        ComponentInfoCard,
    },
    props: {
        mode: {
            type: String
        },
        node: {
            type: Object
        }
    },
}
</script>
