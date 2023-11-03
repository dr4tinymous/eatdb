const express = require('express');
const router = express.Router();
const ingredientsController = require('../../controllers/ingredientsController');

router.get('/getAll', ingredientsController.getNamesForDropdown);
router.get('/:id', ingredientsController.getItemById);
router.get('/', ingredientsController.listAllItems);

module.exports = router;
