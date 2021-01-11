import React from 'react';
import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

import { DomainNode, PageNode } from './custom-node/FlowGraphNode'

export default (props) => {
    const nodeTypes = {
        domain: DomainNode,
        page: PageNode
    };
    const graphStyles = {
        width: "100%",
        height: "500px",
    }
    const onDragOver = (event) => {
        event.preventDefault();
    };
    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            style={graphStyles}
            elements={props.elements}
            onElementClick={props.onElementClick}
            onDrop={props.onDrop}
            onDragOver={onDragOver}
        >
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
};