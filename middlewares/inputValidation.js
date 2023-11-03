const { body, validationResult } = require('express-validator');

// Middleware for validating 'title' field in the request body
exports.validateRecipeInput = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    // Add more validation chains for other inputs as needed...
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
