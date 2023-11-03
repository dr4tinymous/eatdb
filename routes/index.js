const express = require('express');
const router = express.Router();

router.use('/', require('./main')); 

router.use('/submit', require('./submit'));
router.use('/recipes', require('./api/recipe'));
router.use('/ingredients', require('./api/ingredient'));
router.use('/styles', require('./api/style'));
router.use('/equipment', require('./api/equipment'));
router.use('/rss', require('./rss'));

module.exports = router;