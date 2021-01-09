<template>
    <aside>
        <v-chip draggable @drag="onDrag" color='#0FBDA3' class='page' id='page'>Page</v-chip>
        <v-chip draggable @drag="onDrag" color='#9CA8B3' class='domain' id='domain'>Domain</v-chip>
    </aside>
</template>
<script>
export default {
    name: "FlowGraphSidebar",
    methods: {
        onDrag(event){
            const name = event.target.id
            this.$emit('onDragTag', {name})
        }
    }
}
</script>
<style scoped>
aside {
    position: absolute;
    float: left;
    width: 170px; 
    top: 0px;
    bottom: 0px;
    padding-left: 15px;
    padding-top: 15px;
    margin-right: 15px;
    background-color: lightgray;
}
</style>
