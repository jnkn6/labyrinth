import express from 'express'
import filepond from './filepond'
import checklist from './checklist'

const router = express.Router();
router.use('/upload', filepond);
router.use('/checklist', checklist);

export default router
