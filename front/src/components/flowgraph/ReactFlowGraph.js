import React from 'react';
import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

import { DomainNode, PageNode, ComponentNode } from './custom-node/FlowGraphNode'

export default (props) => {
    const nodeTypes = {
        domain: DomainNode,
        page: PageNode,
        component: ComponentNode,
    };
    const graphStyles = {
        width: "100%",
        height: (window.innerHeight*(0.6)).toString() + "px",
    }
    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            style={graphStyles}
            elements={props.elements}
            onElementClick={props.onElementClick}
            onNodeContextMenu={props.onNodeContextMenu}
        >
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
};
