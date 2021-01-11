export default{
    graphElements(state){

        let graphElements = []
        if(state.domainNode !== null){
            graphElements.push(state.domainNode)
        }

        graphElements = graphElements.concat(state.pageNodes);
        graphElements = graphElements.concat(state.edges);
        return graphElements;
    },
}