export default{
    domainNode: null,
    pageNodes: [],
    componentNodes: {}, // {"sourcePageid":[ComponentNodeInfo, ComponentNodeInfo, ...]}
    edges: {}, // {"targetid":[Edge, Edge, ...], "targetid": [Edge, Edge,...]}

    draggingTag: '',
    selectedNode: null,
}
