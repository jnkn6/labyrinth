<template>
    <v-treeview
        :key="Math.random()"
        open-all
        :items="renderTree"
        item-key="code"
        selectable
        selected-color="#ff2a6d"
        selection-type="leaf"
        item-disabled="deactivated"
        dense
        shaped
        hoverable
        v-model="done"
        return-object
    >
        <template #append="{item}">
            <v-btn
                v-if="deactivated.includes(item.code)"
                icon
                @click="onClickActivate(item)"
            >
                <v-icon>mdi-eye-check-outline</v-icon>
            </v-btn>
            <v-btn
                v-else
                icon
                @click="onClickDeactivate(item)"
            >
                <v-icon>mdi-eye-off-outline</v-icon>
            </v-btn>
        </template>
    </v-treeview>
</template>
<script>

import _ from 'lodash'

import moment from 'moment'
import 'moment-timezone'

import {
    CHECKLIST_QUERY,
    CHECK_MUTATION,
    UNCHECK_MUTATION,
    ACTIVATE_MUTATION,
    DEACTIVATE_MUTATION,
} from '@/graphql/checklist'

export default {
    name: "ChecklistTree",
    props: {
        original: {
            type: Array
        },
        node: {
            type: Object
        },
    },
    watch: {
        node: function(next, prev){
            if(next.data._id === prev.data._id){
                return;
            }

            this.initNode();
            this.initTree(this.original, next)
                .then(() => {
                    // Fetch node checklist, Add date info
                    this.fetchChecklist(next);
                });
        },
        original: {
            deep: true,
            handler(next){
                this.initTree(next, this.node);

                // Init timestamp, deactivated
                // Call directly becuase timestamp/deactivated values are not changed
                this.updateTimestamp(this.timestamp);
                this.updateDeactivated(this.deactivated, true);
            }
        },
        timestamp: {
            handler(next, prev){
                // Should called after render
                if(this.original.length === 0){
                    return;
                }

                let updated = _.differenceBy(next, prev, 'date');
                this.updateTimestamp(updated);
            }
        },
        deactivated: function(next, prev){
            // Should called after render
            if(this.original.length === 0){
                return;
            }

            if (next.length > prev.length){
                let updated = _.differenceWith(next, prev, _.isEqual);
                this.updateDeactivated(updated, true);
            }
            else{
                let updated = _.differenceWith(prev, next, _.isEqual);
                this.updateDeactivated(updated, false);
            }
        },
        done: function(next, prev){
            // Should work after first time
            if(!this.doneFirstWatch){
                this.doneFirstWatch = true;
                return;
            }

            if (next.length > prev.length){
                // If Check
                // Get new checked list
                let newCheck = _.differenceBy(next, prev, 'code');
                this.onClickCheck(newCheck);
            }
            else{
                // If Uncheck
                let unCheck = _.differenceBy(prev, next, 'code');
                this.onClickUncheck(unCheck);
            }
        },
    },
    data(){
        return{
            originalArray: [],

            renderTree: [],
            renderArray: [], // Each element of tree array

            done: [],
            timestamp: [],
            deactivated: [],

            doneFirstWatch: false,
        }
    },
    methods: {
        initNode(){
            this.doneFirstWatch = false;
        },
        async initTree(original, node){
            if (original.length === 0){
                return;
            }

            this.originalArray = [];
            this.treeToArray(original, this.originalArray);

            this.initRender(original);
        },
        initRender(checklist){
            if (!checklist){
                return;
            }

            this.renderTree = JSON.parse(JSON.stringify(checklist));

            this.renderArray = [];
            this.treeToArray(this.renderTree, this.renderArray);
        },
        treeToArray(tree, result){
            for(let key in tree){
                result.push(tree[key])
                if(tree[key].children){
                    this.treeToArray(tree[key].children, result);
                }
            }
        },
        updateTimestamp(updated){
            updated.forEach(element => {
                let originalItem = _.find(this.originalArray, { code: element.code })
                if (originalItem){ // If checklist doesn't inlcude code, skip this.
                    let renderItem = _.find(this.renderArray, { code: element.code })

                    const dateStr = moment(element.date).format('YYYY-MM-DD HH:mm:ss');
                    renderItem.name = originalItem.name + " (Updated: " + dateStr + ")"
                }
            });
        },
        updateDeactivated(deactivated, status){
            deactivated.forEach(element => {
                let renderItem = _.find(this.renderArray, { code: element })
                if(renderItem){ // If checklist doesn't inlcude code, skip this.
                    renderItem.deactivated = status;
                }
            });
        },
        fetchChecklist(node){
            // get done/deactivated list
            this.$apollo.query({
                query: CHECKLIST_QUERY,
                variables : {
                    id: node.data.checklist,
                },
            }).then(res => {
                this.done = JSON.parse(res.data.checklist.done);
                this.timestamp = JSON.parse(res.data.checklist.timestamp);
                this.deactivated = res.data.checklist.deactivated;
            });
        },
        onClickCheck(checked){
            let codes = _.map(checked, 'code');

            this.$apollo.mutate({
                mutation: CHECK_MUTATION,
                variables : {
                    done:{
                        _id: this.node.data.checklist,
                        codes: codes
                    }
                },
            }).then(res => {
                // Update date
                let newTimestamp = _.cloneDeep(this.timestamp);

                checked.forEach(element => {
                    if (res.data.check.codes.includes(element.code)){
                        let old = _.find(newTimestamp, { code: element.code })

                        if(old){
                            old.date = res.data.check.date;
                        }
                        else{
                            newTimestamp.push({
                                code: element.code,
                                date: res.data.check.date
                            });
                        }
                    }
                });

                this.timestamp = newTimestamp;
            });
        },
        onClickUncheck(unchecked){
            let codes = _.map(unchecked, 'code');

            this.$apollo.mutate({
                mutation: UNCHECK_MUTATION,
                variables : {
                    undo:{
                        _id: this.node.data.checklist,
                        codes: codes
                    }
                },
            }).then(res => {
 
            });
        },
        onClickDeactivate(item){
            this.$apollo.mutate({
                mutation: DEACTIVATE_MUTATION,
                variables : {
                    deactivate:{
                        _id: this.node.data.checklist,
                        codes: [item.code]
                    }
                },
            }).then(res => {
                this.deactivated = _.union(this.deactivated, res.data.deactivate);

                // force to rerender
                this.$forceUpdate();
            });
        },
        onClickActivate(item){
            this.$apollo.mutate({
                mutation: ACTIVATE_MUTATION,
                variables : {
                    activate:{
                        _id: this.node.data.checklist,
                        codes: [item.code]
                    }
                },
            }).then(res => {
                this.deactivated = _.difference(this.deactivated, res.data.activate);

                // force to rerender
                this.$forceUpdate();
            });
        },
    },
    created(){
        this.initTree(this.original, this.node)
            .then(() => {
                // Fetch node checklist, Add date info
                this.fetchChecklist(this.node);
            });
    }
}
</script>