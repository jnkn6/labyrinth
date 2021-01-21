import express from 'express'
import multer from 'multer'
import fs from 'fs'
import bodyParser from 'body-parser'

const textParser = bodyParser.text({type: 'text/plain'})

const uploadPath = './public/upload/'

const storage = multer.diskStorage({
    destination: uploadPath,
    filename: function ( req, file, cb ) {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});

const router = express.Router();

router.post('/img', upload.single('filepond'), (req, res) => {
    return res.send(req.file)
});

router.delete('/img', textParser, async (req, res) => {
    if (!req.body){
        return res.status(404).send("Image Not found.");
    }

    let item = JSON.parse(req.body)
    if (!item.filename){
        return res.status(404).send("Image Not found.");
    }

    let path = uploadPath + item.filename;
    fs.unlink(path, (err) => {
        if(err){
            console.log(err)
            return res.status(500).send("Delete image failed.");
        }

        return res.status(200).send("Delete image success.");
    });
});

export default router
