<template>
    <div>
        <span>
            <p>{{domain}} is NOT registered.</p> 
            <p>Click the button if you want to register it.</p>
        </span>
        <v-btn dark color="#ff2a6d">Add Domain {{domain}}</v-btn>
    </div>
</template>
<script>
export default {
    name: "DomainAddButton",
    props: {
        domain: {
            type: String
        }
    },
}
</script>
<style scoped>
.v-btn {
    text-transform:none;
}
</style>
