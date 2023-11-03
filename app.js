// Module imports
require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { development: knexConfig } = require('./config/knexfile');
const knex = require('knex')(knexConfig);
const { errorHandler } = require('./middlewares/errorHandling');
const dbMiddleware = require('./middlewares/database')(knex);

const routes = require('./routes');  // Import the modularized routes

const app = express();

// Constants
const PORT = process.env.PORT || 3000;

// App settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(dbMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Use the modularized routes
app.use('/', routes);

// Error handler and server listener
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

module.exports = app;
