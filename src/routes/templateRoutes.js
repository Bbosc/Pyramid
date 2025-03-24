const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get('/', templateController.display);

module.exports = router;
