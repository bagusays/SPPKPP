const Sequelize = require('sequelize');
const model = require('./Index');

const Orders = model.define('pp_orders', {
    IdOrder: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    IdCustomer: {
        type: Sequelize.INTEGER
    },
    TotalQuantity: {
        type: Sequelize.INTEGER
    },
    OrderDate: {
        type: Sequelize.DATE
    },
    DeadlineDate: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

module.exports = Orders;