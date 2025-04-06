const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.get('/', healthController.display);
router.post('/save', healthController.save);
router.post('/delete', healthController.deleteTask);
router.post('/complete', healthController.completeTask);

module.exports = router;
