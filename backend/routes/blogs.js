const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog } = require('../controllers/blogController');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', createBlog); // Note: Should protect with admin middleware in production

module.exports = router;
