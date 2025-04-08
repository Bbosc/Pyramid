const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get('/', templateController.home);
router.get('/:category', templateController.display);

router.post('/:category/save', templateController.save);
router.post('/:category/delete', templateController.deleteTask);
router.post('/:category/complete', templateController.completeTask);

module.exports = router;
