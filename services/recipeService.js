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
    const trx = await knex.transaction();
    try {
        const uniqueTitle = await getUniqueTitle(recipeData.title, trx);
        const [recipeId] = await trx('recipes').insert({ ...recipeData, title: uniqueTitle }).returning('id');
        
        await insertRelatedItems('ingredient', recipeData.ingredients, recipeId, trx);
        await insertRelatedItems('equipment', recipeData.equipment, recipeId, trx);
        await insertRelatedItems('style', recipeData.styles, recipeId, trx);

        await trx.commit();
        return { id: recipeId };
    } catch (error) {
        await trx.rollback();
        throw new Error('Error during recipe submission: ' + error.message);
    }
}

module.exports = {
    getAllRecipes,
    getRecipeDetailsById,
    getRecipeDetailsByTitle,
    submitRecipe
};