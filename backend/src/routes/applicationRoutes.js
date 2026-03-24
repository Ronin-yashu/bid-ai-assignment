import express from 'express';
import { submitApplication, getApplications, getApplicationById } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/application/submit', submitApplication);
router.get('/get/applications', getApplications);
router.get('/applications/:id', getApplicationById);

export default router;
