const express = require("express");
const router = express.Router();
const taskController = require("../controllers/pyramidController");

router.post('/save', taskController.saveTask);
router.post('/delete', taskController.deleteTask);
router.post('/complete', taskController.completeTask);
// get
router.get('/', taskController.getAllTasks);

module.exports = router;
