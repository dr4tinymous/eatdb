const { sanitizeBody } = require('express-validator');
exports.sanitizeRecipeInput = [
    sanitizeBody('title').trim().escape(),
    
    sanitizeBody('servings').toInt(),
    
    sanitizeBody('ingredients.*').trim().escape(),
    
    sanitizeBody('preparation_steps.*').trim().escape(),
    
    sanitizeBody('equipment.*').optional({ checkFalsy: true }).trim().escape(),];