const equipmentService = require('../../services/equipmentService');

exports.getAllEquipment = async (req, res) => {
    try {
        const equipmentList = await equipmentService.getAllEquipmentData();
        res.render('equipmentList', { equipment: equipmentList, title: 'Equipment' });
    } catch (error) {
        console.error("Error retrieving equipment:", error);
        res.status(500).send("Error retrieving equipment");
    }
};

exports.getEquipmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const equipmentDetail = await equipmentService.getEquipmentDetailsById(id);
        res.render('equipmentDetail', { equipment: equipmentDetail, title: equipmentDetail.name });
    } catch (error) {
        console.error('Error retrieving equipment details:', error);
        res.status(500).send('Error retrieving equipment details');
    }
};

