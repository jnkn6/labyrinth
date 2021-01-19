<template>
    <v-app-bar
      color="#01012b"
      dense
      dark
    >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Flow graph</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-subheader>Add node</v-subheader>
                <v-list-item>
                    <v-chip draggable @drag="onDrag" color="#ff2a6d" id='domain'>
                        Domain
                    </v-chip>
                </v-list-item>
                <v-list-item>
                    <v-chip draggable @drag="onDrag" color="#d1f7ff" id='page'>
                        Page
                    </v-chip>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name: "Header",
    methods: {
        ...mapActions([
            'setDraggingTag'
        ]),
        onDrag(event){
            this.setDraggingTag(event.target.id)
        }
    }
}

</script>
