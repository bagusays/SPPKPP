const Sequelize = require('sequelize');
const model = require('./Index');

const Customer = model.define('pp_customers', {
    IdCustomer: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerName: {
        type: Sequelize.STRING
    },
    PhoneNumber: {
        type: Sequelize.STRING(15)
    },
    Address: {
        type: Sequelize.STRING(90)
    }
}, {
    timestamps: false
});

module.exports = Customer;