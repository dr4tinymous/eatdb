const knex = require('../config/database');
const { capitalize, toSingularForm } = require('../utils/formSanitize');

async function getAllData(tableName) {
    return await knex(tableName).select('*');
}

async function getUniqueTitle(title, trx) {
    let uniqueTitle = capitalize(toSingularForm(title));
    let exists = await trx('recipes').where('title', uniqueTitle).first();
    let counter = 2;
    while (exists) {
        uniqueTitle = `${title} (${counter++})`;
        exists = await trx('recipes').where('title', uniqueTitle).first();
    }
    return uniqueTitle;
}

async function insertItemIfNotExist(itemName, tableName, trx) {
    let item = await trx(tableName).where('name', itemName).first();
    if (!item) {
        [item] = await trx(tableName).insert({ name: itemName }).returning('*');
    }
    return item.id;
}

async function insertRelatedItems(tableName, items, recipeId, trx) {
    for (const itemName of items) {
        const itemId = await insertItemIfNotExist(itemName, `${tableName}s`, trx);
        const joinTable = `recipe_${tableName}s`;
        const column = `${tableName}Id`; // Correct foreign key column name
        await trx(joinTable).insert({
            recipeId,
            [column]: itemId
        });
    }
}

module.exports = {
    getAllData,
    getUniqueTitle,
    insertItemIfNotExist,
    insertRelatedItems
};