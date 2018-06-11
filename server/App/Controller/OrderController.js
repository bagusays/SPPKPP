const app = require('express').Router();
const passport = require('passport')
const OrderService = require('../Services/OrderService')
const service = new OrderService();

app.get('/orders/getall', passport.authenticate('bearer', { session: false }), async function(req, res) {
    const data = await service.getAllOrders();
    res.status(data.status || 200).json(data)
})

app.get("/orders/parameter", async function(req, res) {
    const data = await service.getParameter();
    res.status(data.status || 200).json(data)
})

app.post("/orders/detail", async function(req, res) {
    const data = await service.getDetail(req.body.IdOrder);
    res.status(data.status || 200).json(data)
})

app.post("/orders/edit", async function(req, res) {
    const data = await service.updateOrder(req.body);
    res.status(data.status || 200).json(data)
})

app.post("/orders/add", async function(req, res) {
    const data = await service.addOrder(req.body);
    res.status(data.status || 200).json(data)
})

app.post("/orders/delete", async function(req, res) {
    const data = await service.deleteOrder(req.body.IdOrder);
    res.status(data.status || 200).json(data)
})

module.exports = app;