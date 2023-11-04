const express = require('express');
const router = express.Router();
const stylesController = require('../../controllers/stylesController');

router.get('/:id', stylesController.getItemById);
router.get('/', stylesController.listAllItems);

module.exports = router;
