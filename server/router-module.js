const OrderController = require('./App/Controller/OrderController')
const CustomerController = require('./App/Controller/CustomerController')

const RouterModule = [
    OrderController,
    CustomerController
];

module.exports = RouterModule;