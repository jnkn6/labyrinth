<template>
    <div v-if="selectedNode">
        <domain-info-card
            v-if="selectedNode.type === 'domain'"
            :mode="mode"
            @onClose="$emit('onClose')"
        />
        <page-info-card 
            v-if="selectedNode.type === 'page'"
            :mode="mode"
            @onClose="$emit('onClose')"
        />
        <component-info-card 
            v-if="selectedNode.type === 'component'"
            :mode="mode"
            @onClose="$emit('onClose')"
        />
    </div>
</template>
<script>

import { modes, modesCategory } from '@/utils/const'

import DomainInfoCard from './DomainInfoCard'
import PageInfoCard from './PageInfoCard'
import ComponentInfoCard from './ComponentInfoCard'

import { mapState } from 'vuex'

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
    },
    computed: {
        ...mapState([
            'selectedNode',
        ])
    }
}
</script>
