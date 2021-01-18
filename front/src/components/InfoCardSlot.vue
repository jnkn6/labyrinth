<template>
    <v-card elevation="10">
        <v-card-actions>
            <v-spacer />
            <v-btn x-small dark color="red" @click="$emit('onClose')">
                <v-icon small dark>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
        <v-card-title>
            <slot name="title"></slot>
        </v-card-title>

        <v-card-text>
            <slot name="readInfo" v-if="!isEditing"></slot>
            <slot name="editInfo" v-else></slot>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn v-if="!isEditing" dark @click="$emit('onEdit')">
                <v-icon dark>
                    mdi-pencil
                </v-icon>
                Edit
            </v-btn>
            <div v-else>
                <v-btn dark color="red" @click="$emit('onCancel')">
                    <v-icon dark>
                        mdi-cancel
                    </v-icon>
                    Cancel
                </v-btn>
                <v-btn dark color="green" @click="$emit('onSave')">
                    <v-icon dark>
                        mdi-checkbox-marked-circle
                    </v-icon>
                    Save
                </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>
<script>

export default {
    name: "InfoCardSlot",
    props: {
        isEditing: {
            type: Boolean
        },
    },
}
</script>
