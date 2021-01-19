<template>
    <v-card elevation="10">
        <v-card-actions>
            <v-spacer />
            <v-btn icon outlined @click="$emit('onClose')">
                <v-icon >mdi-close</v-icon>
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
            <v-btn elevation="3" v-if="!isEditing" rounded @click="$emit('onEdit')">
                <v-icon>
                    mdi-pencil
                </v-icon>
                Edit
            </v-btn>
            <div v-else>
                <v-btn elevation="1" rounded @click="$emit('onCancel')">
                    <v-icon>
                        mdi-cancel
                    </v-icon>
                    Cancel
                </v-btn>
                <v-btn elevation="3" color="#99ff00" rounded @click="$emit('onSave')">
                    <v-icon>
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
