const knex = require('../config/database');
const { capitalize, toSingularForm } = require('../utils/formSanitize');

async function getAllIngredients() {
    return await getAllData('ingredients');
}

async function getAllEquipment() {
    return await getAllData('equipment');
}

async function getAllStyles() {
    return await getAllData('styles');
}

async function getAllData(tableName) {
    return await knex(tableName).select('*');
}

async function getUniqueTitle(title, trx) {
    let uniqueTitle = capitalize(toSingularForm(title));
    let counter = 2;
    let exists = await trx('recipes').where('title', uniqueTitle).first();

    while (exists) {
        uniqueTitle = `${title} (${counter++})`;
        exists = await trx('recipes').where('title', uniqueTitle).first();
    }

    return uniqueTitle;
}

async function insertItemIfNotExist(table, item) {
    const columnName = table === 'recipes' ? 'title' : 'name';
    const [existingItem] = await knex(table).where(columnName, item[columnName]);
    if (existingItem) {
      return existingItem.id;
    } else {
      const [newItemId] = await knex(table).insert(item, 'id');
      return newItemId;
    }
  }

async function insertRelatedItems(table, items, recipeId, trx) {
    for (const itemName of items) {
        const singularName = toSingularForm(itemName);
        const capitalized = capitalize(singularName);
        const itemId = await insertItemIfNotExist(capitalized, table, trx);

        await trx(`recipe_${table}`).insert({
            recipeId,
            [`${table.slice(0, -1)}Id`]: itemId
        });
    }
}

module.exports = {
    getAllIngredients,
    getAllEquipment,
    getAllStyles,
    getUniqueTitle,
    insertItemIfNotExist,
    insertRelatedItems
};