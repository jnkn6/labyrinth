import React from 'react';
import { Handle } from 'react-flow-renderer';
import styles from './FlowGraphNode.css';

export function DomainNode ({data}) {

    // input will be HTML encoded by react
    return (
        <div className='node domainNode'>
            <Handle
                type="source"
                position="right"
            />
        </div>
    );
}

export function PageNode ({data}) {

    // input will be HTML encoded by react
    return (
        <div className="node pageNode">
            <Handle type="target" position="left"/>
            <div>{data.name}</div>
            <div>{data.path}</div>
            <Handle type="source" position="right"/>
        </div>
    );
};
