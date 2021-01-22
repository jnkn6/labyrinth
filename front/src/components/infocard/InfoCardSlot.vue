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
                :allow-multiple="true"
                accepted-file-types="image/png"
                :server="{
                    url: 'http://127.0.0.1:3000',
                    process: '/upload/img',
                    revert: '/upload/img',
                    restore: '/upload/',
                    load: '/upload/',
                }"
                :files="images"
                :fileRenameFunction="fileRenameFunction"
                @init="handleFilePondInit"
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

import FilePondPluginFileRename from 'filepond-plugin-file-rename'

import FilePondPluginImagePreview  from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import { ALLIMAGE_QUERY } from '@/graphql/image'

const FilePond = vueFilePond(
    FilePondPluginFileRename,
    FilePondPluginImagePreview,
);

export default {
    name: "InfoCardSlot",
    components: {
        FilePond
    },
    props: {
        isEditing: {
            type: Boolean
        },
        node: {
            type: Object
        }
    },
    data() {
        return {
            images: [],
        };
    },
    methods: {
        async fileRenameFunction(file){
            let name = window.prompt('Enter new filename')
        },
        handleFilePondInit: function() {
            let images = [];

            // get uploaded file list
            this.$apollo.query({
            query: ALLIMAGE_QUERY,
                variables : {
                    id: this.node.data._id
                },
            }).then(res => {
                res.data.allImages.forEach(element => {
                    images.push({
                        source: element.source,
                        options: {
                            type: 'limbo',
                        },
                    });
                });

                this.images = images;
            });
        },
    },
}
</script>
