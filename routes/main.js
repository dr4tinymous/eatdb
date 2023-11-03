const express = require('express');
const router = express.Router();
const knex = require('../config/database');
const { getSearchResultsForRecipes } = require('../utils/searchUtility');

router.get('/', async (req, res, next) => {
    try {
        const recipes = await knex('recipes').select('*');
        const ingredients = await knex('ingredients').select('*');
        const styles = await knex('styles').select('*');
        const equipmentList = await knex('equipment').select('*');

        res.render('index', {
            recipes,
            ingredients,
            styles,
            equipmentList,
            title: 'Home'
        });
    } catch (error) {
        console.error("Error retrieving data:", error);
        next(error);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const searchTerm = req.query.query;

        const searchResults = {
            recipes: await getSearchResultsForRecipes(searchTerm),
            ingredients: await knex('ingredients')
                .whereRaw('"search_vector" @@ plainto_tsquery(?) OR name ILIKE ?', [searchTerm, `%${searchTerm}%`]),
            styles: await knex('styles').where('name', 'ilike', `%${searchTerm}%`),
            equipment: await knex('equipment')
                .whereRaw('"search_vector" @@ plainto_tsquery(?) OR name ILIKE ?', [searchTerm, `%${searchTerm}%`])
        };

        res.render('searchResults', {
            searchQuery: searchTerm,
            ...searchResults,
            title: 'Search'
        });
    } catch (error) {
        console.error("Error during search:", error);
        next(error);
    }
});

module.exports = router;
