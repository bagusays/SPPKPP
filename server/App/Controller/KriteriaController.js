const app = require('express').Router();
const KriteriaService = require('../Services/KriteriaService')
const service = new KriteriaService();

app.get('/kriteria/jeniskue/list', async function(req, res) {
    const data = await service.jenisKueList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/edit', async function(req, res) {
    const data = await service.jenisKueEdit(req.body);
    res.status(data.status || 200).json(data);
})

//  KEBAWELAN PELANGGAN
app.get('/kriteria/kebawelanpelanggan/list', async function(req, res) {
    const data = await service.kebawelanPelangganList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kebawelanpelanggan/edit', async function(req, res) {
    const data = await service.kebawelanPelangganEdit(req.body);
    res.status(data.status || 200).json(data);
})

//  KESULITAN BAHAN POKOK
app.get('/kriteria/kesulitanbahanpokok/list', async function(req, res) {
    const data = await service.kesulitanBahanPokokList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kesulitanbahanpokok/edit', async function(req, res) {
    const data = await service.kesulitanBahanPokokEdit(req.body);
    res.status(data.status || 200).json(data);
})

//  JARAK PENGIRIMAN
app.get('/kriteria/jarakpengiriman/list', async function(req, res) {
    const data = await service.jarakPengirimanList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jarakpengiriman/edit', async function(req, res) {
    const data = await service.jarakPengirimanEdit(req.body);
    res.status(data.status || 200).json(data);
})

//  DEADLINE HARI
app.get('/kriteria/deadlinehari/list', async function(req, res) {
    const data = await service.deadlineHariList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/deadlinehari/edit', async function(req, res) {
    const data = await service.deadlineHariEdit(req.body);
    res.status(data.status || 200).json(data);
})

//  TENAGA KERJA
app.get('/kriteria/tenagakerja/list', async function(req, res) {
    const data = await service.tenagaKerjaList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/tenagakerja/edit', async function(req, res) {
    const data = await service.tenagaKerjaEdit(req.body);
    res.status(data.status || 200).json(data);
})

//  KUANTITAS PESANAN
app.get('/kriteria/kuantitaspesanan/list', async function(req, res) {
    const data = await service.kuantitasPesananList(req.body.kriteria);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kuantitaspesanan/edit', async function(req, res) {
    const data = await service.kuantitasPesananEdit(req.body);
    res.status(data.status || 200).json(data);
})

module.exports = app;