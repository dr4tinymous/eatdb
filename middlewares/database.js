module.exports = (knex) => {
    return (req, res, next) => {
        req.db = knex;
        next();
    };
};
