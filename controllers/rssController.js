const knex = require('../config/database');
const RSS = require('rss');

exports.generateRSSFeed = async (req, res) => {
    try {
        const feed = new RSS({
            title: 'EatDB',
            description: 'Recipes & Nutrition',
            feed_url: 'https://eatdb.dratmonious.com/rss.xml',
            site_url: 'https://eatdb.dratmonious.com',
        });

        const recipes = await knex('recipes').select('*').limit(10);

        recipes.forEach(recipe => {
            feed.item({
                title: recipe.title,
                url: `https://eatdb.dratmoonious.com/recipes/${recipe.id}`,
            });
        });

        const xml = feed.xml();
        res.type('text/xml');
        res.send(xml);

    } catch (error) {
        console.error("Error generating RSS feed:", error);
        res.status(500).send("Error generating RSS feed");
    }
};
