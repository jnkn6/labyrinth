<template>
    <v-card elevation="10">
        <v-card-actions>
            <v-spacer />
            <v-btn x-small dark color="red" @click="onClose">
                <v-icon small dark>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>


export default {
    name: "InfoCard",
    props: {
        mode: {
            type: String
        },
        node: {
            type: Object
        }
    },
    methods: {
        onClose(){
            this.$emit('onClose')
        },
    }
}
</script>
