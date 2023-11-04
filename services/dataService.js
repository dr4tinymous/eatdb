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
    for (const item of items) {
        const itemId = await insertItemIfNotExist({ name: item }, tableName, trx);
        const joinTable = `recipe_${tableName}`;
        const column = `${tableName.slice(0, -1)}Id`; // Correct foreign key column name
        
        // Check if the relation already exists to prevent duplicate entries
        const existingRelation = await trx(joinTable)
            .where({ recipeId, [column]: itemId })
            .first();
            
        if (!existingRelation) {
            await trx(joinTable).insert({
                recipeId,
                [column]: itemId
            });
        }
    }
}

module.exports = {
    getAllData,
    getUniqueTitle,
    insertItemIfNotExist,
    insertRelatedItems
};