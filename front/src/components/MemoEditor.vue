<template>
    <div class="easymde">
        <textarea/>
    </div>
</template>
<script>

import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'

import DOMPurify from 'dompurify'

export default {
    name: 'MemoEditor',
    props:{
        value: String,
    },
    data(){
        return {
            config: {},
            easymde: null,
        }
    },
    methods: {
        bindingEvents() {
            this.easymde.codemirror.on('change', (instance, changeObj) => {
                if (changeObj.origin === 'setValue') {
                    return;
                }
                const val = this.easymde.value();
                this.handleInput(val);
            });
            this.easymde.codemirror.on('blur', () => {
                const val = this.easymde.value();
                this.handleBlur(val);
            });
        },
        handleInput(val) {
            this.isUpdated = true;
            this.$emit('input', val);
        },
        handleBlur(val) {
            this.isUpdated = true;
            this.$emit('blur', val);
        },
    },
    mounted(){
        this.config = {
            element: this.$el.firstElementChild,
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
                sanitizerFunction: (renderedHTML) => {
                    return DOMPurify.sanitize(renderedHTML, {
                        USE_PROFILES: {html: true}
                    });
                }
            },
            initialValue: this.value,
        }
        this.easymde = new EasyMDE(this.config);

        this.bindingEvents();
    },
}
</script>
