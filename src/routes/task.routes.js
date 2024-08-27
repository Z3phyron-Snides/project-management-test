const express = require('express');
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.post('/:projectId/tasks', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
// New route to get all tasks for a specific project
router.get('/:projectId', taskController.getTasks);

module.exports = router;
