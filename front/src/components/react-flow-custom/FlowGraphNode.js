import React from 'react';
import { Handle } from 'react-flow-renderer';

import validator from 'validator'

export function DomainNode ({data}) {

    const domainNodeStyles = {
        background: '#9CA8B3',
        color: '#FFF',
        padding: 10,
    };

    // HTML encode
    let url = validator.escape(data.url)

    return (
        <div style={domainNodeStyles}>
            <div>{url}</div>
            <Handle
                type="source"
                position="right"
            />
        </div>
    );
}
