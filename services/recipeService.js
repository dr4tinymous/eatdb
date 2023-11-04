const knex = require('../config/database');
const { sanitizeTitle, handleRelation } = require('../utils/formSanitize');
const getAllRecipes = async () => {
    const recipes = await knex('recipes').select('*');
    return recipes;
};
const getRecipeById = async (id) => {
    const recipe = await knex('recipes').where('id', id).first();
    if (!recipe) {
        return null;
    }

    const ingredients = await knex('recipe_ingredients')
        .join('ingredients', 'recipe_ingredients.ingredientId', 'ingredients.id')
        .where('recipe_ingredients.recipeId', id)
        .select('ingredients.name', 'ingredients.id');

    const equipment = await knex('recipe_equipment')
        .join('equipment', 'recipe_equipment.equipmentId', 'equipment.id')
        .where('recipe_equipment.recipeId', id)
        .select('equipment.name', 'equipment.id');

    return { ...recipe, ingredients, equipment };
};

const submitRecipe = async (recipeData) => {
    let {
        title,
        prepTime,
        cookTime,
        servingAmount,
        directions,
        preCookingConsiderations,
        extraInformation,
        ingredients,
        equipment,
        styles
    } = recipeData;

    title = await sanitizeTitle(title);

    const result = await knex('recipes').insert({
        title,
        prepTime,
        cookTime,
        servingAmount,
        directions,
        preCookingConsiderations,
        extraInformation
    }).returning('id');

    const recipeId = result[0];

    return recipeId;
};

module.exports = { submitRecipe, getAllRecipes, getRecipeById };