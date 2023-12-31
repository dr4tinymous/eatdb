const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipes/recipeController');

router.get('/:id', recipeController.getRecipeById);
router.get('/', recipeController.getAllRecipes);

module.exports = router;