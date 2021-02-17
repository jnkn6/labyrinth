import {
    CONCAT_EDGES,
    CONCAT_PAGE_NODES,
    CONCAT_COMPONENT_NODES,
    DELETE_PAGE_NODE,
    EMPTY_EDGES,
    EMPTY_PAGE_NODES,
    SET_DOMAIN_NODE,
    PUSH_PAGE_NODE,
    SET_DRAGGING_TAG,
    UPDATE_PAGE_NODE,
    UPDATE_COMPONENT_NODE,
    PUSH_COMPONENT_NODE,
    CLOSE_COMPONENT_NODES,
    EMPTY_COMPONENT_NODES,
    SET_SELECTED_NODE,
} from './mutations-types'

import {
    DOMAININFO_QUERY,
    CREATEDOMAIN_MUTATION,
    MODIFYDOMAIN_MUTATION,
} from '@/graphql/domain'

import {
    ALLPAGESINFO_QUERY,
    CREATEPAGE_MUTATION,
    MODIFYPAGE_MUTATION,
} from '@/graphql/page'

import {
    ALLCOMPONENTSINFO_QUERY,
    CREATECOMPONENT_MUTATION,
    MODIFYCOMPONENT_MUTATION,
} from '@/graphql/component'

export default {
    fetchDomainNode({commit}, {vue, domain}){
        vue.$apollo.query({
            query: DOMAININFO_QUERY,
                variables : {
                    url: domain
                },
        }).then(res => {
            if (res.data.domainInfo != null){
                commit(SET_DOMAIN_NODE, {
                    id: res.data.domainInfo._id,
                    type: 'domain',
                    data: { ...res.data.domainInfo },
                    position: {x:100, y:100}
                });
            }
            else{
                commit(SET_DOMAIN_NODE, null);
            }

        })
    },
    fetchPageNodes({commit}, {vue, domainNode}){
        let pages = [];
        let edges = {};

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
                y += 130;
                
                if (!(page._id in edges))
                {
                    edges[page._id] = [];
                }
                // Add edge
                edges[page._id].push({
                    id: "e" + domainNode.data._id + "-" + page._id,
                    source: domainNode.data._id,
                    target: page._id,
                    type: "step"
                });
            });

            commit(CONCAT_PAGE_NODES, pages);
            vue.$nextTick(() => {
                commit(CONCAT_EDGES, edges);
            })
        })
        .catch(err => {console.log(err);})
    },
    fetchComponentNodes({commit}, {vue, pageNode} ){
        let components = {};
        let edges = {};

        vue.$apollo.query({
            query: ALLCOMPONENTSINFO_QUERY,
            variables : {
                page: pageNode.data._id
            },
        }).then(res => {
            let x = pageNode.position.x + 200;
            let y = pageNode.position.y;
    
            res.data.allComponentsInfo.forEach((component, index) => {

                let source = pageNode.data._id;
                let x_modify = x;
                let y_modify = y;

                // if nested node
                if (component.parent !== null){
                    source = component.parent;
                    x_modify = x + 200;
                }

                if (!(component.page in components))
                {
                    components[component.page] = [];
                }

                // Add node
                components[component.page].push({
                    id: component._id,
                    type: 'component',
                    data: { ...component },
                    position: { x: x_modify, y: y_modify },
                });
                y += 130;
                
                // Add edge
                if (!(component._id in edges))
                {
                    edges[component._id] = [];
                }

                edges[component._id].push({
                    id: "e" + source + "-" + component._id,
                    source: source,
                    target: component._id,
                    type: "step"
                });
            });

            commit(CONCAT_COMPONENT_NODES, components);
            vue.$nextTick(() => {
                commit(CONCAT_EDGES, edges);
            })
        })
        .catch(err => {console.log(err);})
    },
    emptyPageNodes({commit}){
        commit(EMPTY_PAGE_NODES);
    },
    emptyComponentNodes({commit}){
        commit(EMPTY_COMPONENT_NODES);
    },
    emptyEdges({commit}){
        commit(EMPTY_EDGES)
    },
    closeComponentNodes({commit}, pageId){
        commit(CLOSE_COMPONENT_NODES, pageId);
    },
    concatPageNodes({commit}, pageNodes){
        commit(CONCAT_PAGE_NODES, pageNodes);
    },
    concatEdges({commit}, edges){
        commit(CONCAT_EDGES, edges);
    },
    createNode({dispatch}, {vue, type, position}){
        switch(type){
            case "page":
                return dispatch('createPageNode', {vue:vue, position: position});
            case "domain":
                console.log("createNode domain is not implemented")
                return undefined;
        }
    },
    createComponentNode({state, commit}, {vue, position, pageId, parentId}){
         // save Data at DB
         return vue.$apollo.mutate({
            mutation: CREATECOMPONENT_MUTATION,
            variables : {
                component: {
                    _id: "new_id",
                    name: "new_component",
                    domain: state.domainNode.data._id,
                    page: pageId,
                    parent: parentId,
                    groups: [],
                    components: [],
                    memo: ""
                },
            },
        }).then(res => {
            // add to node
            let componentNode = {
                id: res.data.createComponent._id,
                type: 'component',
                position: position,
                data: res.data.createComponent,
            };

            commit(PUSH_COMPONENT_NODE, componentNode);

            // create new edge
            let edgeSource = pageId;

            if(parentId !== null){
                edgeSource = parentId;
            }

            let newEdge = {
                [componentNode.id]: [{
                    id: "e" + edgeSource + "-" + componentNode.id,
                    source: edgeSource,
                    target: componentNode.id,
                    type: "step"
                }]
            };

            vue.$nextTick(() => {
                commit(CONCAT_EDGES, newEdge)
            });

            return componentNode;
        });
    },
    createDomainNode({state, commit}, {vue, url}){
        // save Data at DB
        return vue.$apollo.mutate({
            mutation: CREATEDOMAIN_MUTATION,
            variables : {
                domain: {
                    _id: "new_id",
                    url: url,
                    pages: [],
                    memo: ""
                },
            },
        }).then(res => {
            // add to node
            let domainNode = {
                id: res.data.createDomain._id,
                type: 'domain',
                position: {x:100, y:100},
                data: res.data.createDomain,
            };

            commit(SET_DOMAIN_NODE, domainNode);

            return domainNode;
        });
    },
    createPageNode({state, commit}, {vue, position}){

        // save Data at DB
        return vue.$apollo.mutate({
            mutation: CREATEPAGE_MUTATION,
            variables : {
                page: {
                    _id: "new_id",
                    name: "new_page",
                    path: "new_path",
                    domain: state.domainNode.data._id,
                    groups: [],
                    components: [],
                    memo: ""
                },
            },
        }).then(res => {
            // add to node
            let pageNode = {
                id: res.data.createPage._id,
                type: 'page',
                position: position,
                data: res.data.createPage,
            };

            commit(PUSH_PAGE_NODE, pageNode);

            // create new edge
            let newEdge = {
                [pageNode.id]: [{
                    id: "e" + state.domainNode.data._id + "-" + pageNode.id,
                    source: state.domainNode.data._id,
                    target: pageNode.id,
                    type: "step"
                }]
            };

            vue.$nextTick(() => {
                commit(CONCAT_EDGES, newEdge);
            });

            return pageNode;
        });
    },
    modifyDomainNode({commit}, {vue, oldNode, newDomainData}){
        // save Data at DB
        vue.$apollo.mutate({
            mutation: MODIFYDOMAIN_MUTATION,
            variables : {
                domain: newDomainData
            },
        }).then(res => {
            let newDomainNode = {
                ...oldNode,
                data: res.data.modifyDomain,
            };

            // update graph
            commit(SET_DOMAIN_NODE, newDomainNode)
        })
    },
    modifyPageNode({commit}, {vue, oldNode, newPageData}){

        // save Data at DB
        vue.$apollo.mutate({
            mutation: MODIFYPAGE_MUTATION,
            variables : {
                page: newPageData
            },
        }).then(res => {
            let newPageNode = {
                ...oldNode,
                data: res.data.modifyPage,
            };

            // update graph
            commit(UPDATE_PAGE_NODE, newPageNode)
        })
    },
    modifyComponentNode({commit}, {vue, oldNode, newComponentData}){
        // save Data at DB
        vue.$apollo.mutate({
            mutation: MODIFYCOMPONENT_MUTATION,
            variables : {
                component: newComponentData
            },
        }).then(res => {
            let newComponentNode = {
                ...oldNode,
                data: res.data.modifyComponent,
            };

            // update graph
            commit(UPDATE_COMPONENT_NODE, newComponentNode)
        })
    },
    setDraggingTag({commit}, name){
        commit(SET_DRAGGING_TAG, name);
    },
    setSelectedNode({commit}, node){
        commit(SET_SELECTED_NODE, node);
    }
}