import {
    CONCAT_EDGES,
    CONCAT_PAGE_NODES,
    DELETE_PAGE_NODE,
    EMPTY_EDGES,
    EMPTY_PAGE_NODES,
    SET_DOMAIN_NODE,
    PUSH_PAGE_NODE,
    SET_DRAGGING_TAG,
    UPDATE_PAGE_NODE,
    PUSH_COMPONENT_NODE,
    UPDATE_COMPONENT_NODE,
} from "./mutations-types";

import Vue from 'vue'

export default{
    [SET_DOMAIN_NODE](state, domainNode){
        state.domainNode = domainNode;
    },
    [EMPTY_PAGE_NODES](state){
        state.pageNodes = [];
    },
    [EMPTY_EDGES](state){
        state.edges = {};
    },
    [CONCAT_PAGE_NODES](state, pageNodes){
        state.pageNodes = state.pageNodes.concat(pageNodes);
    },
    [CONCAT_EDGES](state, edges){
        for (const nodeId in edges){
            // Add new node's edge
            if (!(nodeId in state.edges)){
                Vue.set(state.edges, nodeId, edges[nodeId])
                continue;
            }
 
            // If node is not new
        }
    },
    [DELETE_PAGE_NODE](state, id){
        //delete page node
        for (let i = 0; i< state.pageNodes.length; i++){
            if (state.pageNodes[i].id === id){
                state.pageNodes.splice(i, 1);
                break;
            }
        }

        // delete edges concatenated with this node
        for (let i = 0; i< state.edges.length; i++){
            if (state.edges[i].target === id){
                state.edges.splice(i, 1);
            }
            else if (state.edges[i].source === id){
                state.edges.splice(i, 1);
            }
        }

    },
    [PUSH_PAGE_NODE](state, pageNode){
        state.pageNodes.push(pageNode);
    },
    [PUSH_COMPONENT_NODE](state, componentNode){
        // If page already opend component node
        const pageId = componentNode.data.page;
        if (pageId in state.componentNodes){
            state.componentNodes[pageId].push(componentNode);
            return;
        }

        // If first open
        Vue.set(state.componentNodes, pageId, [componentNode]);
    },
    [SET_DRAGGING_TAG](state, name){
        state.draggingTag = name;
    },
    [UPDATE_PAGE_NODE](state, newPageNode){
        for (let i = 0; i< state.pageNodes.length; i++){
            if (state.pageNodes[i].id === newPageNode.id){
                state.pageNodes.splice(i, 1);
                state.pageNodes.push(newPageNode);
                break;
            }
        }
    },
    [UPDATE_COMPONENT_NODE](state, newComponentNode){
        const pageId = newComponentNode.data.page;
        if (!(pageId in state.componentNodes)){
            console.log("No node to update. Please add node first.")
            return;
        }

        for (let i = 0; i< state.componentNodes[pageId].length; i++){
            if (state.componentNodes[pageId][i].id === newComponentNode.id){
                state.componentNodes[pageId].splice(i, 1);
                state.componentNodes[pageId].push(newComponentNode);
                break;
            }
        }
    },
}