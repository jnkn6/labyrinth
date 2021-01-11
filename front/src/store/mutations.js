import {
    CONCAT_EDGES,
    CONCAT_PAGE_NODES,
    EMPTY_EDGES,
    EMPTY_PAGE_NODES,
    FETCH_DOMAIN_NODES,
    PUSH_PAGE_NODE,
    SET_DRAGGING_TAG,
} from "./mutations-types";

export default{
    [FETCH_DOMAIN_NODES](state, domainNodes){
        state.domainNodes = domainNodes;
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
    [SET_DRAGGING_TAG](state, name){
        state.draggingTag = name;
    },
}