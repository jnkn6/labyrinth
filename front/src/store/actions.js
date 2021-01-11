import {
    CONCAT_EDGES,
    CONCAT_PAGE_NODES,
    EMPTY_EDGES,
    EMPTY_PAGE_NODES,
    FETCH_DOMAIN_NODES,
    PUSH_PAGE_NODE,
} from './mutations-types'

import { DOMAININFO_QUERY } from '@/graphql/domain'
import { ALLPAGESINFO_QUERY } from '@/graphql/page'

import { uuidv4 } from '@/utils/utils'


export default {
    fetchDomainNodes({commit}, {vue, domain}){
        vue.$apollo.query({
            query: DOMAININFO_QUERY,
                variables : {
                    url: domain
                },
        }).then(res => {
            commit(FETCH_DOMAIN_NODES, [{
                id: res.data.domainInfo._id,
                type: 'domain',
                data: { ...res.data.domainInfo },
                position: {x:100, y:100}
            }]);
        })
    },
    fetchPageNodes({commit}, {vue, domainNode}){
        let pages = [];
        let edges = [];

        vue.$apollo.query({
            query: ALLPAGESINFO_QUERY,
            variables : {
                domain: domainNode.data._id
            },
        }).then(res => {
            let x = domainNode.position.x + 200;
            let y = domainNode.position.y;
    
            res.data.allPagesInfo.forEach((page, index) => {

                // Add node
                pages.push({
                    id: page._id,
                    type: 'page',
                    data: { ...page },
                    position: { x: x, y: y },
                });
                y += 100;
    
                // Add edge
                edges.push({
                    id: "e" + domainNode.data._id + "-" + page._id,
                    source: domainNode.data._id,
                    target: page._id
                });
            });

            commit(CONCAT_PAGE_NODES, pages);
            vue.$nextTick(() => {
                commit(CONCAT_EDGES, edges);
            })
        })
        .catch(err => {console.log(err);})
    },
    emptyPageNodes({commit}){
        commit(EMPTY_PAGE_NODES);
    },
    emptyEdges({commit}){
        commit(EMPTY_EDGES)
    },
    concatPageNodes({commit}, pageNodes){
        commit(CONCAT_PAGE_NODES, pageNodes);
    },
    concatEdges({commit}, edges){
        commit(CONCAT_EDGES, edges);
    },
    createTempNode({dispatch}, { type, position }){
        switch(type){
            case "page":
                dispatch('createTempPageNode', position);
                break;
            case "domain":
                console.log("createTempNode domain is not implemented")
                break;
        }
    },
    createTempPageNode({commit}, position){
        let id = uuidv4() // this ID is temporary, real ID will be made by DB.
        let data = data = { _id: id, name: "new_page", path: "new_path" };

        commit(PUSH_PAGE_NODE, {
            id: id,
            type: 'page',
            position: position,
            data: data,
        });
    }
}