const express = require("express");
const router = express.Router();
const chronosController = require("../controllers/chronosController");

router.get('/', chronosController.display);
router.post('/save', chronosController.saveTask);
router.post('/delete', chronosController.deleteTask);

module.exports = router;
