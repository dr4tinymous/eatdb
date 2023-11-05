const { getAllRecipes, getRecipeById, submitRecipe } = require('../../services/recipeService');
exports.getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await getAllRecipes();
        res.render('recipesList', { recipes, title: 'Recipes' });
    } catch (error) {
        console.error("Error retrieving recipes:", error);
        next(error);
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await getRecipeById(id);

        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }

        res.render('recipeDetail', { recipe, title: recipe.title });
    } catch (error) {
        console.error("Error retrieving recipe details:", error);
        res.status(500).send("An error occurred while retrieving recipe details.");
    }
};

exports.submitRecipe = async (req, res, next) => {
    try {
        const recipeId = await submitRecipe(req.body);
        res.status(201).json({ message: 'Recipe successfully submitted', recipeId });
    } catch (error) {
        console.error("Error submitting recipe:", error);
        next(error);
    }
};