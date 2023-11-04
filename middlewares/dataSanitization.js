const { validationResult, sanitizeBody } = require('express-validator');

function sanitizeInput(req, res, next) {
    sanitizeBody('*').escape();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    sanitizeInput
};