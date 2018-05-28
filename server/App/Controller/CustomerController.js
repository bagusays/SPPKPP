const app = require('express').Router();
const Customer = require('../Model/Customer')

app.get('/customers/list', async function(req, res) {
    const data = await Customer.findAll();
    res.status(200).json(data)
})

module.exports = app;