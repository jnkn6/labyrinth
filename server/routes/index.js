import express from 'express'
import filepond from './filepond'
import checklist from './checklist'
import nodetype from './nodetype'

const router = express.Router();
router.use('/upload', filepond);
router.use('/checklist', checklist);
router.use('/nodetype', nodetype);

export default router
