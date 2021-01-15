<template>
    <div class="easymde">
        <textarea/>
    </div>
</template>
<script>

import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'


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
    mounted(){
        this.config = {
            element: this.$el.firstElementChild,
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
            },
            initialValue: this.value,
        }
        this.easymde = new EasyMDE(this.config);

    },
}
</script>
