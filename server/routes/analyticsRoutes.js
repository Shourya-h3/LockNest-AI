import express from 'express';
import { getDashboardAnalytics, getSecurityAudit } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getDashboardAnalytics);
router.get('/audit', protect, getSecurityAudit);

export default router;
