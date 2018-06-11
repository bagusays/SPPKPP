const app = require('express').Router();
const AuthService = require('../Services/AuthService')
const service = new AuthService();

app.post('/auth/requestToken', async function(req, res) {
    const data = await service.requestToken(req.body)
    res.json(data)
})

app.post('/auth/verifyToken', async function(req, res) {
    const data = await service.verifyToken(req.body.token)
    res.json(data)
})

module.exports = app;