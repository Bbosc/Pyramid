const express = require("express");
const router = express.Router();
const chronosController = require("../controllers/chronosController");

router.get('/', chronosController.display);
router.post('/create', chronosController.createTask);
router.post('/delete', chronosController.deleteTask);

module.exports = router;
