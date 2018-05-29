const app = require('express').Router();
const CustomerService = require('../Services/CustomerService')
const service = new CustomerService();

app.get('/customers/list', async function(req, res) {
    const data = await service.getAllCustomer();
    res.status(data.status || 200).json(data);
})

app.post('/customers/edit', async function(req, res) {
    const data = await service.editCustomer(req.body)
    res.status(data.status || 200).json(data)
})

module.exports = app;