export default{
    graphElements(state){
        let graphElements = state.domainNodes.concat(state.pageNodes);
        graphElements = graphElements.concat(state.edges);
        return graphElements;
    },
}