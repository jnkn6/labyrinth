import {
    CONCAT_EDGES,
    CONCAT_PAGE_NODES,
    CONCAT_COMPONENT_NODES,
    DELETE_PAGE_NODE,
    EMPTY_EDGES,
    EMPTY_PAGE_NODES,
    SET_DOMAIN_NODE,
    PUSH_PAGE_NODE,
    UPDATE_PAGE_NODE,
    CLOSE_COMPONENT_NODES,
    PUSH_COMPONENT_NODE,
    UPDATE_COMPONENT_NODE,
    EMPTY_COMPONENT_NODES,
} from "./mutations-types";

import Vue from 'vue'
import _ from "lodash"

export default{
    [SET_DOMAIN_NODE](state, domainNode){
        if(state.domainNode && state.domainNode.id === domainNode.id){
            Vue.set(state, 'domainNode', domainNode);
        }
        else{
            state.domainNode = domainNode;
        }
    },
    [EMPTY_PAGE_NODES](state){
        state.pageNodes = [];
    },
    [EMPTY_COMPONENT_NODES](state){
        state.componentNodes = {};
    },
    [EMPTY_EDGES](state){
        state.edges = {};
    },
    [CLOSE_COMPONENT_NODES](state, pageID){
        if (!state.componentNodes[pageID]){
            return;
        }

        // remove edge
        state.componentNodes[pageID].forEach(element => {
            if (state.edges[element.data._id]){
                Vue.delete(state.edges, element.data._id);
            }
        });

        // remove node
        Vue.delete(state.componentNodes, pageID);
    },
    [CONCAT_PAGE_NODES](state, pageNodes){
        state.pageNodes = state.pageNodes.concat(pageNodes);
    },
    [CONCAT_COMPONENT_NODES](state, componentNodes){
        
        for (const parentId in componentNodes){
            // Add new node's edge
            if (!(parentId in state.componentNodes)){
                Vue.set(state.componentNodes, parentId, componentNodes[parentId])
                continue;
            }

            // If node is not new
            let newNode = _.differenceBy(componentNodes[parentId], state.componentNodes[parentId], 'id');
            state.componentNodes[parentId] = state.componentNodes[parentId].concat(newNode);
        }
    },
    [CONCAT_EDGES](state, edges){
        for (const nodeId in edges){
            // Add new node's edge
            if (!(nodeId in state.edges)){
                Vue.set(state.edges, nodeId, edges[nodeId])
                continue;
            }
 
            // If node is not new
            let newEdge = _.differenceBy(state.edges[nodeId], edges[nodeId], 'id');
            state.edges[nodeId] = state.edges[nodeId].concat(newEdge);
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
    [UPDATE_PAGE_NODE](state, node){
        for (let i = 0; i< state.pageNodes.length; i++){
            if (state.pageNodes[i].id === node.id){
                Vue.set(state.pageNodes, i, node);
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