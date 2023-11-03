const styleService = require('../../services/styleService');

exports.getAllStyles = async (req, res) => {
    try {
        const stylesList = await styleService.getAllStyleData();
        res.render('stylesList', { styles: stylesList, title: 'Styles' });
    } catch (error) {
        console.error("Error retrieving styles:", error);
        res.status(500).send("Error retrieving styles");
    }
};

exports.getStyleById = async (req, res) => {
    try {
        const { id } = req.params;
        const styleDetail = await styleService.getStyleDetailsById(id);
        res.render('styleDetail', { style: styleDetail, title: styleDetail.name });
    } catch (error) {
        console.error('Error retrieving style details:', error);
        res.status(500).send('Error retrieving style details');
    }
};
