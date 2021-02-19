import express from 'express'
import bodyParser from 'body-parser'

import {
    checklist,
    configure,
    getFilteredChecklist,
} from '../resources/checklist/checklist'

const parser = bodyParser.json()

const router = express.Router();

router.get('/conf.json', (req, res) => {
    return res.send(configure)
});

router.post('/:key', parser, (req, res) => {
    const key = req.params.key;

    const name = req.body.name;
    const expand = req.body.expand;
    const vulFilter = req.body.vulFilter;

    if (!key || !name){
        return res.status(404).send("Checklist not found.");
    }

    if(!checklist[key] || !checklist[key][name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = [];

    if (vulFilter.length === 0 && expand){
        result = JSON.stringify(checklist[key][name + "_expand"])
    }
    else if (vulFilter.length === 0){
        result = JSON.stringify(checklist[key][name])
    }
    else {
        result = getFilteredChecklist(key, name, expand, vulFilter);
    }

    return res.send(result)
});

export default router;
