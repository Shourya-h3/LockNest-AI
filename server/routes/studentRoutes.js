import express from 'express';
import {
  registerStudent,
  getStudents,
  getStudentStats
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, registerStudent)
  .get(protect, getStudents);

router.route('/stats')
  .get(protect, getStudentStats);

export default router;
