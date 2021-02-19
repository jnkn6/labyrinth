import express from 'express'
import bodyParser from 'body-parser'

import nodetype from '../resources/nodetype'

const parser = bodyParser.json()

const router = express.Router();

router.post('/vul', parser, (req, res) => {
    const key = req.body.key; // ex) 'domain' or 'page' or 'component'
    const types = req.body.nodetype; // ex) ['form', 'form_checkbox']

    if (!key){
        return res.status(404).send("nodetype not found.");
    }

    if (!nodetype.nodetypeOrder[key]){
        return res.status(404).send("nodetype not found.");
    }

    let result = [];

    types.forEach(type => {
        if (nodetype.nodetype[key][type] && nodetype.nodetype[key][type].vul){
            result = result.concat(nodetype.nodetype[key][type].vul);
        }
    });

    result = [...new Set(result)];

    return res.send(result)
});

router.post('/:key', parser, (req, res) => {
    const key = req.params.key;

    if (!key){
        return res.status(404).send("nodetype not found.");
    }

    if (!nodetype.nodetypeOrder[key]){
        return res.status(404).send("nodetype not found.");
    }

    return res.send(nodetype.nodetypeOrder[key])
});

export default router;
