import React from 'react';
import { Handle } from 'react-flow-renderer';
import styles from './FlowGraphNode.css';

export function DomainNode ({data}) {

    // input will be HTML encoded by react
    return (
        <div className='node domainNode'>
            <div className='titleBox'>
                <i className="mdi mdi-earth"></i>
                Domain
            </div>
            <div className="infoBox">
                <div>
                    <b>URL </b>
                    {data.url}
                </div>
            </div>
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
            <div className="titleBox">
                <i className="mdi mdi-file"></i>
                Page
            </div>
            <div className="infoBox">
                <div>
                    <b>Path </b>
                    {data.path}
                    <br />
                    <b>Name </b>
                    {data.name}
                </div>
            </div>
            <Handle type="source" position="right"/>
        </div>
    );
};


export function ComponentNode ({data}) {

    // input will be HTML encoded by react
    return (
        <div className="node componentNode">
            <Handle type="target" position="left"/>
            <div className="titleBox">
                <i className="mdi mdi-file"></i>
                Component
            </div>
            <div className="infoBox">
                <div>
                    <b>Name </b>
                    {data.name}
                </div>
            </div>
            <Handle type="source" position="right"/>
        </div>
    );
};
