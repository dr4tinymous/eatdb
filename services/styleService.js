const knex = require('../config/database');

module.exports = {
    async getStyleNames() {
        try {
            return await knex('styles').select('name');
        } catch (error) {
            console.error("Error fetching style names:", error);
            throw error;
        }
    },

    async getStyleDetailsById(styleId) {
        try {
            return await knex('styles').where('id', styleId).first();
        } catch (error) {
            console.error(`Error fetching style with id ${styleId}:`, error);
            throw error;
        }
    },

    async getAllStyleData() {
        try {
            return await knex('styles').select('*');
        } catch (error) {
            console.error("Error retrieving all style data:", error);
            throw error;
        }
    }
};

