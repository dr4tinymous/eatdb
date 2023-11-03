const knex = require('../config/database');

module.exports = {
    async getIngredientNames() {
        try {
            return await knex('ingredients').select('name');
        } catch (error) {
            console.error("Error fetching ingredient names:", error);
            throw error;
        }
    },

    async getIngredientDetailsById(ingredientId) {
        try {
            return await knex('ingredients').where('id', ingredientId).first();
        } catch (error) {
            console.error(`Error fetching ingredient with id ${ingredientId}:`, error);
            throw error;
        }
    },

    async getAllIngredientData() {
        try {
            return await knex('ingredients').select('*');
        } catch (error) {
            console.error("Error retrieving all ingredient data:", error);
            throw error;
        }
    }
};

