exports.up = function(knex) {
  return knex.schema.createTable('recipe_equipment', table => {
    table.increments('id').primary();
    table.integer('recipeId').unsigned().references('recipes.id');
    table.integer('equipmentId').unsigned().references('equipment.id');
    table.unique(['recipeId', 'equipmentId']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipe_equipment');
};
