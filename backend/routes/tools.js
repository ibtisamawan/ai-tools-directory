const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', toolController.getTools);
router.get('/search', toolController.searchTools);
router.get('/stats', authMiddleware, toolController.getStats);
router.get('/category/:name', toolController.getToolsByCategory);
router.get('/:id', toolController.getToolById);

// Admin routes (protected)
router.post('/', authMiddleware, toolController.createTool);
router.put('/:id', authMiddleware, toolController.updateTool);
router.delete('/:id', authMiddleware, toolController.deleteTool);

// Reviews
router.post('/reviews', toolController.addReview);

module.exports = router;
