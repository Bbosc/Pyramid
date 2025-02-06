const express = require("express");
const router = express.Router();
const chronosController = require("../controllers/chronosController");

router.get('/', chronosController.display);

module.exports = router;
