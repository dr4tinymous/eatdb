exports.up = function(knex) {
  return knex.schema.createTable('recipe_ingredients', table => {
    table.increments('id').primary();
    table.integer('recipeId').unsigned().references('recipes.id');
    table.integer('ingredientId').unsigned().references('ingredients.id');
    table.unique(['recipeId', 'ingredientId']);});};

exports.down = function(knex) {
  return knex.schema.dropTable('recipe_ingredients');};
