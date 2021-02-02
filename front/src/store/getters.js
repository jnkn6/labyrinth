export default{
    graphElements(state){

        let graphElements = []
        if(state.domainNode !== null){
            graphElements.push(state.domainNode)
        }

        graphElements = graphElements.concat(state.pageNodes);

        for (const key in state.componentNodes){
            graphElements = graphElements.concat(state.componentNodes[key]);
        }

        for (const key in state.edges){
            graphElements = graphElements.concat(state.edges[key]);
        }

        return graphElements;
    },
}