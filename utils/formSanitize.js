const knex = require('../config/database');
const pluralize = require('pluralize');

function capitalize(str) {
    return str.replace(/\b\w/g, ([char]) => char.toUpperCase());
}

function toSingularForm(str) {
    return pluralize.singular(str);
}

async function getUniqueName(tableName, initialName, columnName) {
    if (!columnName) {
        columnName = tableName === 'recipes' ? 'title' : 'name';
    }
    let name = capitalize(toSingularForm(initialName));
    let counter = 2;
    let doesExist = await knex(tableName).where(columnName, name).first();

    while (doesExist) {
        name = `${initialName} (${counter})`;
        counter += 1;
        doesExist = await knex(tableName).where(columnName, name).first();
    }

    return name;
}

module.exports = { capitalize, toSingularForm, getUniqueName };
