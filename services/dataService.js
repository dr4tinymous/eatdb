const knex = require('../config/database');
const pluralize = require('pluralize');

async function getAllData(tableName) {
    try {
        return await knex(tableName).select('*');
    } catch (error) {
        throw new Error(`Error retrieving all data from ${tableName}: ${error.message}`);
    }
}

async function getDataById(tableName, id) {
    try {
        return await knex(tableName).where('id', id).first();
    } catch (error) {
        throw new Error(`Error retrieving data from ${tableName} with ID ${id}: ${error.message}`);
    }
}

async function getNames(tableName) {
    const columnName = tableName === 'recipes' ? 'title' : 'name';
    try {
        return await knex(tableName).select(columnName);
    } catch (error) {
        throw new Error(`Error retrieving names from ${tableName}: ${error.message}`);
    }
}

async function getDetailedDataById(tableName, id, relations = []) {
    try {
        const data = await getDataById(tableName, id);
        if (!data) return null;

        // Handle related data fetching here...

        return data;
    } catch (error) {
        throw new Error(`Error retrieving detailed data from ${tableName} with ID ${id}: ${error.message}`);
    }
}

async function getItemByColumnName(tableName, columnName, value) {
    // Adjust column for recipes table
    columnName = tableName === 'recipes' ? 'title' : columnName;
    try {
        return await knex(tableName).where(columnName, value).first();
    } catch (error) {
        throw new Error(`Error retrieving item from ${tableName} with ${columnName} ${value}: ${error.message}`);
    }
}

async function insertData(tableName, data) {
    try {
        const [newId] = await knex(tableName).insert(data).returning('id');
        return getDataById(tableName, newId);
    } catch (error) {
        throw new Error(`Error inserting data into ${tableName}: ${error.message}`);
    }
}

async function getUniqueName(tableName, initialName) {
    let name = capitalize(pluralize.singular(initialName));
    let columnName = tableName === 'recipes' ? 'title' : 'name';
    let counter = 2;
    let doesExist = await getItemByColumnName(tableName, columnName, name);

    while (doesExist) {
        name = `${initialName} (${counter})`;
        counter++;
        doesExist = await getItemByColumnName(tableName, columnName, name);
    }

    return name;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = {
    getAllData,
    getDataById,
    getNames,
    getDetailedDataById,
    getItemByColumnName,
    insertData,
    getUniqueName
};