const knex = require('../config/database');

async function getSearchResultsForRecipes(searchTerm) {
	return await knex('recipes')
        .whereRaw('"search_vector" @@ plainto_tsquery(?) OR title ILIKE ?', [searchTerm, `%${searchTerm}%`])
        .orWhereExists(function () {
            this.select('*')
                .from('recipe_ingredients')
                .join('ingredients', 'recipe_ingredients.ingredientId', 'ingredients.id')
                .whereRaw('"recipes"."id" = "recipe_ingredients"."recipeId" AND (ingredients.name ILIKE ?)', [`%${searchTerm}%`]);
        })
        .orWhereExists(function () {
            this.select('*')
                .from('recipe_styles')
                .join('styles', 'recipe_styles.stylesId', 'styles.id')
                .whereRaw('"recipes"."id" = "recipe_styles"."recipeId" AND (styles.name ILIKE ?)', [`%${searchTerm}%`]);
        })
        .orWhereExists(function () {
            this.select('*')
                .from('recipe_equipment')
                .join('equipment', 'recipe_equipment.equipmentId', 'equipment.id')
                .whereRaw('"recipes"."id" = "recipe_equipment"."recipeId" AND (equipment.name ILIKE ?)', [`%${searchTerm}%`]);
        })
        .distinct('recipes.id', 'recipes.title');
}

module.exports = {
    getSearchResultsForRecipes
};
