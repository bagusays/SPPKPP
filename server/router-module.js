const OrderController = require('./App/Controller/OrderController')
const CustomerController = require('./App/Controller/CustomerController')
const AuthController = require('./App/Controller/AuthController')

const RouterModule = [
    OrderController,
    CustomerController,
    AuthController
];

module.exports = RouterModule;