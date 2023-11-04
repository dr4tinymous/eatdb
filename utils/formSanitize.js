
const pluralize = require('pluralize');

function capitalize(str) {
    return str.replace(/\b\w/g, ([char]) => char.toUpperCase());
}

function toSingularForm(str) {
    return pluralize.singular(str);
}

module.exports = { capitalize, toSingularForm };