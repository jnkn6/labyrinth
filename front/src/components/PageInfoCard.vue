<template>
    <v-container>
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>
            <v-row justify="space-around">
                <v-col>
                    <div>name: {{node.data.name}}</div>
                    <div>path: {{node.data.path}}</div>
                    <div>memo: {{node.data.memo}}</div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-container>
</template>
<script>

import { modes } from '@/utils/const'

export default {
    name: "PageInfoCard",
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
                case modes.CREATE_NEW_PAGE:
                    return 'Create new page';
                case modes.EDIT_PAGE:
                    return "Edit page information";
                case modes.READ_PAGE_INFO:
                    return 'Page informtaion';
            }
        },

    }
}
</script>
