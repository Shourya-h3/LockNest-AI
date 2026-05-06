import express from 'express';
import {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword
} from '../controllers/passwordController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getPasswords)
  .post(protect, createPassword);

router.route('/:id')
  .put(protect, updatePassword)
  .delete(protect, deletePassword);

export default router;
