const Sequelize = require('sequelize');
const model = require('./Index');

const MasterCriteria = model.define('pp_mastercriteria', {
    IdMasterCriteria: {
        type: Sequelize.INTEGER,
        primaryKey: true
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

module.exports = MasterCriteria;