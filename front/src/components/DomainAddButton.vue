<template>
    <div>
        <span>
            <p>{{domain}} is NOT registered.</p> 
            <p>Click the button if you want to register it.</p>
        </span>
        <v-btn dark color="#ff2a6d" @click="onAddDomain">Add Domain {{domain}}</v-btn>
    </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
    name: "DomainAddButton",
    props: {
        domain: {
            type: String
        }
    },
    methods: {
        ...mapActions([
            'createDomainNode'
        ]),
        onAddDomain(){
            this.createDomainNode({
                vue: this,
                url: this.domain,
            });
        },
    },
}
</script>
<style scoped>
.v-btn {
    text-transform:none;
}
</style>
