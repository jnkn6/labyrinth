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

            <file-pond
                v-if="isEditing"
                name="filepond"
                ref="pond"
                label-idle="Drop files here..."
                v-bind:allow-multiple="true"
                accepted-file-types="image/png"
                server="http://127.0.0.1:3000/upload/img"
                v-bind:files="images"
            />
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

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond();

export default {
    name: "InfoCardSlot",
    props: {
        isEditing: {
            type: Boolean
        },
    },
    data() {
        return {
            images: []
        };
    },
    components: {
        FilePond
    }
}
</script>
