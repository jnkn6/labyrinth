import express from 'express'
import bodyParser from 'body-parser'

import checklist from '../resources/checklist/checklist'

const parser = bodyParser.json()

const router = express.Router();

router.post('/domain', parser, (req, res) => {
    const name = req.body.name;
    const expand = req.body.expand;

    if (!name){
        return res.status(404).send("Checklist not found.");
    }

    if (!checklist.domainChecklist[name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

    if (expand){
        result = JSON.stringify(checklist.domainChecklist[name + "_expand"])
    }
    else{
        result = JSON.stringify(checklist.domainChecklist[name])
    }

    return res.send(result)
});

router.post('/page', parser, (req, res) => {
    const name = req.body.name;
    const expand = req.body.expand;

    if (!name){
        return res.status(404).send("Checklist not found.");
    }

    if (!checklist.pageChecklist[name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

    if (expand){
        result = JSON.stringify(checklist.pageChecklist[name + "_expand"])
    }
    else{
        result = JSON.stringify(checklist.pageChecklist[name])
    }

    return res.send(result)
});

router.post('/component', parser, (req, res) => {
    const name = req.body.name;
    const expand = req.body.expand;

    if (!name){
        return res.status(404).send("Checklist not found.");
    }

    if (!checklist.componentChecklist[name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

    if (expand){
        result = JSON.stringify(checklist.componentChecklist[name + "_expand"])
    }
    else{
        result = JSON.stringify(checklist.componentChecklist[name])
    }

    return res.send(result)
});

router.get('/conf.json', (req, res) => {
    return res.send(checklist.configure)
});

export default router;
