import React from 'react';
import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

import { DomainNode, PageNode } from './react-flow-custom/FlowGraphNode'

export default (props) => {
    const nodeTypes = {
        domain: DomainNode,
        page: PageNode
    };
    const graphStyles = {
        width: "100%",
        height: "500px",
    }
    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            style={graphStyles}
            elements={props.elements}
            onElementClick={props.onElementClick}
        >
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
};
