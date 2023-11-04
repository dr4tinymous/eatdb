const express = require('express');
const router = express.Router();
const equipmentController = require('../../controllers/equipmentController');

router.get('/:id', equipmentController.getItemById);
router.get('/', equipmentController.listAllItems);

module.exports = router;
