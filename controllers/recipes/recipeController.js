const recipeService = require('../../services/recipeService');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.render('recipesList', { recipes, title: 'Recipes' });
    } catch (error) {
        res.status(500).send("Error retrieving recipes: " + error.message);
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipeDetails = await recipeService.getRecipeDetailsById(req.params.id);
        if (!recipeDetails) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipeDetail', { ...recipeDetails, title: recipeDetails.title });
    } catch (error) {
        res.status(500).send("Error retrieving recipe: " + error.message);
    }
};

exports.getRecipeByTitle = async (req, res) => {
    try {
        const recipeDetails = await recipeService.getRecipeDetailsByTitle(req.params.title);
        if (!recipeDetails) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipeDetail', { ...recipeDetails, title: recipeDetails.title });
    } catch (error) {
        res.status(500).send("Error retrieving recipe: " + error.message);
    }
};

exports.submitRecipe = async (req, res) => {
    try {
        const savedRecipe = await recipeService.submitRecipe(req.body);
        res.redirect(`/recipes/${savedRecipe.id}`);
    } catch (error) {
        res.status(500).send("Error submitting recipe: " + error.message);
    }
};