import { Router } from 'express';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllBlogs);
router.post('/', authenticate, createBlog);
router.put('/:id', authenticate, updateBlog);
router.delete('/:id', authenticate, deleteBlog);

export default router;
