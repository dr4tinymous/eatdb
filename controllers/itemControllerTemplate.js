const dataService = require('../services/dataService');

function createItemController(tableName) {
    return {
        async listAllItems(req, res) {
            try {
                const items = await dataService.getAllData(tableName);
                res.json(items);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        
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
    };
}

module.exports = createItemController;
