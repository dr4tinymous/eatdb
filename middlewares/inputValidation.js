const { body, validationResult } = require('express-validator');

exports.validateRecipeInput = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    
    body('servings')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('Servings must be a positive number')
        .toInt(),

    body('ingredients')
        .isArray().withMessage('Ingredients must be an array')
        .notEmpty().withMessage('Ingredients cannot be empty'),

    body('preparation_steps')
        .isArray().withMessage('Preparation steps must be an array')
        .notEmpty().withMessage('Preparation steps cannot be empty'),

    body('equipment')
        .optional({ nullable: true })
        .isArray().withMessage('Equipment must be an array'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();}];