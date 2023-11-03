exports.up = function(knex) {
  return knex.schema.createTable('recipe_styles', table => {
    table.increments('id').primary();
    table.integer('recipeId').unsigned().references('recipes.id');
    table.integer('stylesId').unsigned().references('styles.id');
    table.unique(['recipeId', 'stylesId']); // ensures unique combinations
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipe_styles');
};
