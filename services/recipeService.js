const knex = require('../config/database');
const { getUniqueTitle, insertItemIfNotExist, insertRelatedItems } = require('./dataService');

async function getAllRecipes() {
    return await knex('recipes').select('*');
}

async function getRecipeDetailsById(id) {
    const details = await knex('recipes as r')
        .leftJoin('recipe_ingredients as ri', 'r.id', 'ri.recipeId')
        .leftJoin('recipe_equipment as re', 'r.id', 're.recipeId')
        .leftJoin('recipe_styles as rs', 'r.id', 'rs.recipeId')
        .leftJoin('ingredients as i', 'ri.ingredientId', 'i.id')
        .leftJoin('equipment as e', 're.equipmentId', 'e.id')
        .leftJoin('styles as s', 'rs.styleId', 's.id')
        .select(
            'r.*',
            knex.raw('ARRAY_AGG(DISTINCT i.name) as ingredients'),
            knex.raw('ARRAY_AGG(DISTINCT e.name) as equipment'),
            knex.raw('ARRAY_AGG(DISTINCT s.name) as styles')
        )
        .where('r.id', id)
        .groupBy('r.id')
        .first();
    
    return details;
}

async function getRecipeDetailsByTitle(title) {
    const recipe = await knex('recipes').where('title', title).select('id').first();
    return recipe ? getRecipeDetailsById(recipe.id) : null;
}

async function submitRecipe(recipeData) {
    const trx = await knex.transaction();
    try {
        const { title, ingredients, equipment, styles, ...data } = recipeData;
        const uniqueTitle = await getUniqueTitle(title, trx);
        const [recipeId] = await trx('recipes').insert({ ...data, title: uniqueTitle }).returning('id');
        
        await insertRelatedItems('ingredients', ingredients, recipeId, trx);
        await insertRelatedItems('equipment', equipment, recipeId, trx);
        await insertRelatedItems('styles', styles, recipeId, trx);

        await trx.commit();
        return { id: recipeId };
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