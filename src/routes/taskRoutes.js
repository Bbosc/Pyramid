const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// create
router.get('/new', taskController.createTask);
router.post('/save', taskController.saveTask);
router.post('/save/json', taskController.saveTaskJson);
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
