const recipeService = require('../../services/recipeService');
const dataService = require('../../services/dataService');
const { getUniqueName, capitalize } = require('../../utils/formSanitize');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.render('recipesList', { recipes, title: 'Recipes' });
    } catch (error) {
        console.error("Error retrieving recipes:", error);
        res.status(500).send("Error retrieving recipes");}};

exports.renderSubmitForm = async (req, res) => {
    try {
        res.render('submitForm', {
            title: 'Add Recipe'
        });
    } catch (error) {
        console.error("Error rendering the submit form:", error);
        res.status(500).send("Error displaying the submit form");}};

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipeDetails = await recipeService.getRecipeDetailsById(id);
        if (!recipeDetails) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipeDetail', { ...recipeDetails, title: recipeDetails.recipe.title });
    } catch (error) {
        console.error("Error retrieving recipe by ID:", error);
        res.status(500).send("Error retrieving recipe");}};

exports.getRecipeByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const recipeDetails = await recipeService.getRecipeDetailsByTitle(title);
        if (!recipeDetails) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipeDetail', { ...recipeDetails, title: recipeDetails.recipe.title });
    } catch (error) {
        console.error("Error retrieving recipe by title:", error);
        res.status(500).send("Error retrieving recipe");}};

exports.submitRecipe = async (req, res) => {
    try {
        const {
            title,
            prepTime,
            cookTime,
            servingAmount,
            preCookingConsiderations,
            directions,
            extraInformation,
            ingredients = [],
            equipment = [],
            styles = [],
        } = req.body;

        const savedRecipe = await recipeService.submitRecipe({
            title,
            prepTime,
            cookTime,
            servingAmount,
            preCookingConsiderations,
            directions,
            extraInformation,
            ingredients,
            equipment,
            styles,
        });

        res.redirect(`/recipes/${savedRecipe.id}`);
    } catch (error) {
        console.error("Error submitting recipe:", error);
        res.status(500).send("Error submitting recipe");}};