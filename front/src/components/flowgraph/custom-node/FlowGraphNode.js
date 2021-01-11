import React from 'react';
import { Handle } from 'react-flow-renderer';

export function DomainNode ({data}) {

    const domainNodeStyles = {
        background: '#9CA8B3',
        color: '#FFF',
        padding: 10,
    };

    // input will be HTML encoded by react
    return (
        <div style={domainNodeStyles}>
            <div>{data.url}</div>
            <Handle
                type="source"
                position="right"
            />
        </div>
    );
}

export function PageNode ({data}) {
    const pageNodeStyles = {
        background: '#0FBDA3',
        color: '#FFF',
        padding: 10,
    };

    // input will be HTML encoded by react
    return (
        <div style={pageNodeStyles}>
            <Handle type="target" position="left"/>
            <div>{data.name}</div>
            <div>{data.path}</div>
            <Handle type="source" position="right"/>
        </div>
    );
};
