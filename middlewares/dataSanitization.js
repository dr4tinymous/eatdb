const { body, validationResult } = require('express-validator');

// Middleware for sanitizing all fields in the request body
exports.sanitizeInput = [
    body('*').escape(), // Sanitize every field to escape HTML and JavaScript
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
