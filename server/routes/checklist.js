import express from 'express'
import bodyParser from 'body-parser'

import checklist from '../checklist/checklist'

const parser = bodyParser.json()

const router = express.Router();

router.post('/domain', parser, (req, res) => {
    const name = req.body.name;

    if (!name){
        return res.status(404).send("Checklist not found.");
    }

    if (!checklist.domainChecklist[name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

        result = JSON.stringify(checklist.domainChecklist[name])
    return res.send(result)
});

router.post('/page', parser, (req, res) => {
    const name = req.body.name;

    if (!name){
        return res.status(404).send("Checklist not found.");
    }

    if (!checklist.pageChecklist[name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

        result = JSON.stringify(checklist.pageChecklist[name])

    return res.send(result)
});

router.post('/component', parser, (req, res) => {
    const name = req.body.name;

    if (!name){
        return res.status(404).send("Checklist not found.");
    }

    if (!checklist.componentChecklist[name]){
        return res.status(404).send("Checklist not found.");
    }

    let result = {};

        result = JSON.stringify(checklist.componentChecklist[name])
    return res.send(result)
});

export default router;
