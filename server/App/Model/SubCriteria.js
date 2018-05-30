const Sequelize = require('sequelize');
const model = require('./Index');

const SubCriteria = model.define('pp_subcriteria', {
    IdSubCriteria: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    IdMasterCriteria: {
        type: Sequelize.INTEGER
    },
    CriteriaName: {
        type: Sequelize.STRING(30)
    },
    CriteriaValue: {
        type: Sequelize.DOUBLE(4, 2)
    }
}, {
    timestamps: false
});

module.exports = SubCriteria;