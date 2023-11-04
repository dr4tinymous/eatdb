const knex = require('../config/database');

async function getAllRecipes() {
    return await knex('recipes').select('*');
}

async function getRecipeDetailsById(id) {
    const recipe = await knex('recipes').where('id', id).select('title', 'id').first(); // changed 'name' to 'title'

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

    const styles = await knex('recipe_styles')
        .join('styles', 'recipe_styles.stylesId', 'styles.id')
        .where('recipe_styles.recipeId', id)
        .select('styles.name', 'styles.id');

    return { recipe, ingredients, equipment, styles };
}

async function getRecipeDetailsByTitle(title) {
    const recipe = await knex('recipes').where('id', id).select('title', 'title').first(); // changed 'name' to 'title'

    if (!recipe) {
        return null;
    }

    return await getRecipeDetailsById(recipe.id);
}

async function submitRecipe(data) {
    return await knex.transaction(async trx => {
        const { title, description, ingredients, equipment, styles } = data;

        const [recipeId] = await trx('recipes').insert({
            title,
            description
        });

        // Logic for inserting ingredients, equipment, and styles can be added here
        // This assumes that they're arrays or some form of structured data. 

        return { id: recipeId };
    });
}

module.exports = {
    getAllRecipes,
    getRecipeDetailsById,
    getRecipeDetailsByTitle,
    submitRecipe
};
