const Sequelize = require('sequelize');
const model = require('./Index');

const FuzzyJenisKue = model.define('pp_fuzzyjeniskuecriteria', {
    IdFuzzy: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CriteriaName: {
        type: Sequelize.STRING(10)
    },
    CriteriaValue: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false
});

module.exports = FuzzyJenisKue;