const knex = require('../config/database');
const { getUniqueTitle, insertItemIfNotExist, insertRelatedItems } = require('./dataService');

async function getAllRecipes() {
    return await knex('recipes').select('*');
}

async function getRecipeDetailsById(id) {
    const recipe = await knex('recipes').where('id', id).first();
    if (!recipe) return null;
    
    const ingredients = await knex('ingredients')
        .join('recipe_ingredients', 'ingredients.id', 'recipe_ingredients.ingredientId')
        .where('recipe_ingredients.recipeId', id)
        .select('ingredients.name');
    
    const equipment = await knex('equipment')
        .join('recipe_equipment', 'equipment.id', 'recipe_equipment.equipmentId')
        .where('recipe_equipment.recipeId', id)
        .select('equipment.name');
    
    const styles = await knex('styles')
        .join('recipe_styles', 'styles.id', 'recipe_styles.styleId')
        .where('recipe_styles.recipeId', id)
        .select('styles.name');
    
    return {
        ...recipe,
        ingredients: ingredients.map(i => i.name),
        equipment: equipment.map(e => e.name),
        styles: styles.map(s => s.name)
    };
}

async function getRecipeDetailsByTitle(title) {
    const recipe = await knex('recipes').where('title', title).select('id').first();
    return recipe ? getRecipeDetailsById(recipe.id) : null;
}

async function submitRecipe(recipeData) {
    if (typeof recipeData.title !== 'string' || recipeData.title.trim() === '') {
        throw new Error('Invalid title. Title must be a non-empty string.');
    }
    if (!Array.isArray(recipeData.ingredients)) {
        throw new Error('Invalid ingredients. Ingredients must be an array.');
    }
    if (!Array.isArray(recipeData.preparation_steps)) {
        throw new Error('Invalid preparation steps. Preparation steps must be an array.');
    }

    if (recipeData.servings && (typeof recipeData.servings !== 'number' || recipeData.servings <= 0)) {
        throw new Error('Invalid servings. Servings must be a positive number.');
    }

    const trx = await knex.transaction();
    try {
        const uniqueTitle = await getUniqueTitle(recipeData.title, trx);
        const { ingredients, equipment, styles, ...dataWithoutItems } = recipeData;
        const [recipeId] = await trx('recipes').insert({ ...dataWithoutItems, title: uniqueTitle }).returning('id');
        
        await Promise.all([
            insertRelatedItems('ingredient', ingredients, recipeId, trx),
            insertRelatedItems('equipment', equipment, recipeId, trx),
            insertRelatedItems('style', styles, recipeId, trx)
        ]);

        await trx.commit();
        return recipeId;
    } catch (error) {
        await trx.rollback();
        throw error;
    }
}

module.exports = {
    getAllRecipes,
    getRecipeDetailsById,
    getRecipeDetailsByTitle,
    submitRecipe
};