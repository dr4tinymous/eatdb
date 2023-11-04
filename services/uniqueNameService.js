const knex = require('../config/database');

async function getUniqueName(tableName, initialName, columnName = 'name') {
    let name = initialName;
    let counter = 2;
    let doesExist = await knex(tableName).where(columnName, name).first();

    while (doesExist) {
        name = `${initialName} (${counter})`;
        counter += 1;
        doesExist = await knex(tableName).where(columnName, name).first();
    }

    return name;
}

module.exports = { getUniqueName };