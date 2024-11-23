const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// create
router.post('/save', taskController.saveTask);
// delete
router.post('/delete/:name', taskController.deleteTaskByName);
// update
router.get('/edit/:name', taskController.editTaskByName);
router.post('/update', taskController.updateTask);
// get
router.get('/', taskController.getAllTasks);
router.get('/json', taskController.getAllTasksJson);
router.get('/:name', taskController.getTaskByName);

module.exports = router;
