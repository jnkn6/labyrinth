import express from 'express'
import bodyParser from 'body-parser'

import { checklist, configure } from '../resources/checklist/checklist'

const parser = bodyParser.json()

const router = express.Router();

router.get('/conf.json', (req, res) => {
    return res.send(configure)
});

router.post('/:key', parser, (req, res) => {
    const key = req.params.key;

    const name = req.body.name;
    const expand = req.body.expand;

    if (!key || !name){
        return res.status(404).send("Checklist not found.");
    }

    if(!checklist[key] || !checklist[key][name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

    if (expand){
        result = JSON.stringify(checklist[key][name + "_expand"])
    }
    else{
        result = JSON.stringify(checklist[key][name])
    }

    return res.send(result)
});


export default router;
