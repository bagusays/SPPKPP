const OrderController = require('./App/Controller/OrderController')
const CustomerController = require('./App/Controller/CustomerController')
const AuthController = require('./App/Controller/AuthController')
const KriteriaController = require('./App/Controller/KriteriaController')

const RouterModule = [
    OrderController,
    CustomerController,
    AuthController,
    KriteriaController
];

module.exports = RouterModule;