const app = require('express').Router();
const OrderService = require('../Services/OrderService')
const service = new OrderService();

app.get('/orders/getall', async (req, res) => {
    const data = await service.getAllOrders();
    res.status(data.status || 200).json(data)
})

app.get("/orders/parameter", async function(req, res) {
    const data = await service.getParameter();
    res.status(data.status || 200).json(data)
})

module.exports = app;