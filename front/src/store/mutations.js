import {
    CONCAT_EDGES,
    CONCAT_PAGE_NODES,
    EMPTY_EDGES,
    EMPTY_PAGE_NODES,
    FETCH_DOMAIN_NODE,
    PUSH_EDGE,
    PUSH_PAGE_NODE,
    SET_DRAGGING_TAG,
    UPDATE_PAGE_NODE,
} from "./mutations-types";

export default{
    [FETCH_DOMAIN_NODE](state, domainNode){
        state.domainNode = domainNode;
    },
    [EMPTY_PAGE_NODES](state){
        state.pageNodes = [];
    },
    [EMPTY_EDGES](state){
        state.edges = [];
    },
    [CONCAT_PAGE_NODES](state, pageNodes){
        state.pageNodes = state.pageNodes.concat(pageNodes);
    },
    [CONCAT_EDGES](state, edges){
        state.edges = state.edges.concat(edges);
    },
    [PUSH_PAGE_NODE](state, pageNode){
        state.pageNodes.push(pageNode);
    },
    [PUSH_EDGE](state, edge){
        state.edges.push(edge);
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
    }
}