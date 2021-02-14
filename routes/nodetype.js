import express from 'express'
import bodyParser from 'body-parser'

import nodetype from '../resources/nodetype'

const parser = bodyParser.text({type: 'text/plain'})

const router = express.Router();

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
