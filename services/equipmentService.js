const knex = require('../config/database');

module.exports = {
    async getEquipmentNames() {
        try {
            return await knex('equipment').select('name');
        } catch (error) {
            console.error("Error fetching equipment names:", error);
            throw error;
        }
    },

    async getEquipmentDetailsById(equipmentId) {
        try {
            return await knex('equipment').where('id', equipmentId).first();
        } catch (error) {
            console.error(`Error fetching equipment with id ${equipmentId}:`, error);
            throw error;
        }
    },

    async getAllEquipmentData() {
        try {
            return await knex('equipment').select('*');
        } catch (error) {
            console.error("Error retrieving all equipment data:", error);
            throw error;
        }
    }
};

