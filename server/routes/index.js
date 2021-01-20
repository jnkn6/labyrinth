import express from 'express'
import filepond from './filepond'

const router = express.Router();
router.use('/upload', filepond);

export default router
