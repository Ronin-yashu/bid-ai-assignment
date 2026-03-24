import express from 'express';
import { createJob, getJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/job/create', createJob);
router.get('/get/jobs', getJobs);

export default router;
