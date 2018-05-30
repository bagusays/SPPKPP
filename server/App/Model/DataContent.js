const Sequelize = require('sequelize');
const model = require('./Index');

const DataContent = model.define('pp_datecontent', {
    IdDataContent: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    IdOrder: {
        type: Sequelize.INTEGER
    },
    IdMasterCriteria: {
        type: Sequelize.INTEGER
    },
    IdSubCriteria: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

module.exports = DataContent;