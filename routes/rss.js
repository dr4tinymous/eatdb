const express = require('express');
const router = express.Router();
const rssController = require('../controllers/rssController');

router.get('/', rssController.generateRSSFeed);

module.exports = router;
