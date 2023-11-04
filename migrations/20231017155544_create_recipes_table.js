exports.up = function(knex) {
  return knex.schema.createTable('recipes', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.integer('prepTime').notNullable();
    table.integer('cookTime').notNullable();
    table.integer('servingAmount').notNullable();
    table.text('preCookingConsiderations');
    table.text('directions').notNullable();
    table.text('extraInformation');
    table.timestamps(true, true);});};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');};
