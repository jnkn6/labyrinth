import { FETCH_DOMAIN_NODES } from "./mutations-types";

export default{
    [FETCH_DOMAIN_NODES](state, domainNodes){
        state.domainNodes = domainNodes;
    },

}