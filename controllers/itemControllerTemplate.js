// Assume dataService has been imported and initialized
const dataService = require('../services/dataService');

// Define a generic controller for items
function createItemController(tableName) {
    return {
        // List all items
        async listAllItems(req, res) {
            try {
                const items = await dataService.getAllData(tableName);
                res.json(items);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        
        // Get a single item by ID
        async getItemById(req, res) {
            try {
                const id = req.params.id;
                const item = await dataService.getDataById(tableName, id);
                if (!item) {
                    return res.status(404).json({ error: 'Item not found' });
                }
                res.json(item);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        
        // Get names for dropdowns
        async getNamesForDropdown(req, res) {
            try {
                const names = await dataService.getNames(tableName);
                res.json(names);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    };
}

module.exports = createItemController;
