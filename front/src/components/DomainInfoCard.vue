<template>
    <v-card-title>{{title}}</v-card-title>
</template>
<script>

import { modes } from '@/utils/const'

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
    computed: {
        title() {
            switch(this.mode){
                case modes.READ_DOMAIN_INFO:
                    return 'Domain infomation';
            }
        },
    }
}
</script>
