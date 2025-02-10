const express = require("express");
const router = express.Router();
const pyramidController = require("../controllers/pyramidController");

router.post('/save', pyramidController.saveTask);
router.post('/delete', pyramidController.deleteTask);
router.post('/complete', pyramidController.completeTask);
// get
router.get('/', pyramidController.getAllTasks);

module.exports = router;
