const ingredientService = require('../../services/ingredientService');

exports.getAllIngredients = async (req, res) => {
    try {
        const ingredientsList = await ingredientService.getAllIngredientData();
        res.render('ingredientsList', { ingredients: ingredientsList, title: 'Ingredients' });
    } catch (error) {
        console.error("Error retrieving ingredients:", error);
        res.status(500).send("Error retrieving ingredients");
    }
};

exports.getIngredientById = async (req, res) => {
    try {
        const { id } = req.params;
        const ingredientDetail = await ingredientService.getIngredientDetailsById(id);
        res.render('ingredientDetail', { ingredient: ingredientDetail, title: ingredientDetail.name });
    } catch (error) {
        console.error('Error retrieving ingredient details:', error);
        res.status(500).send('Error retrieving ingredient details');
    }
};
