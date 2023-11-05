const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes/recipeController');
const { validateRecipeInput } = require('../middlewares/inputValidation');
const { sanitizeInput } = require('../middlewares/dataSanitization');

router.get('/', (req, res) => {
    res.render('submitForm', { title: 'Add Recipe' });
});

router.post('/', [validateRecipeInput, sanitizeInput], recipeController.submitRecipe);

module.exports = router;
