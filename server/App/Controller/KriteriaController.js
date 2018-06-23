const app = require('express').Router();
const KriteriaService = require('../Services/KriteriaService')
const service = new KriteriaService();


//
//
//  ----- MASTER KRITERIA
//
//
//
app.get('/kriteria/master/list', async function(req, res) {
    const data = await service.masterList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/master/detail', async function(req, res) {
    const data = await service.masterDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/master/edit', async function(req, res) {
    const data = await service.masterEdit(req.body);
    res.status(data.status || 200).json(data);
})

//
//
//  ----- JENIS KUE & FUZZY
//
//
app.get('/kriteria/jeniskue/list', async function(req, res) {
    const data = await service.jenisKueAndFuzzyList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/detail', async function(req, res) {
    const data = await service.jenisKueDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/tambah', async function(req, res) {
    const data = await service.jenisKueTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/edit', async function(req, res) {
    const data = await service.jenisKueEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/delete', async function(req, res) {
    const data = await service.jenisKueDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/fuzzy/detail', async function(req, res) {
    const data = await service.fuzzyKueDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/fuzzy/tambah', async function(req, res) {
    const data = await service.fuzzyKueTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/fuzzy/edit', async function(req, res) {
    const data = await service.fuzzyKueEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jeniskue/fuzzy/delete', async function(req, res) {
    const data = await service.fuzzyKueDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

//
//
//  ----- KEBAWELAN PELANGGAN
//
//
app.get('/kriteria/kebawelanpelanggan/list', async function(req, res) {
    const data = await service.kebawelanPelangganList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kebawelanpelanggan/detail', async function(req, res) {
    const data = await service.kebawelanPelangganDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kebawelanpelanggan/tambah', async function(req, res) {
    const data = await service.kebawelanPelangganTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kebawelanpelanggan/edit', async function(req, res) {
    const data = await service.kebawelanPelangganEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kebawelanpelanggan/delete', async function(req, res) {
    const data = await service.kebawelanPelangganDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

//
//
// ----- KESULITAN BAHAN POKOK
//
//
app.get('/kriteria/kesulitanbahanpokok/list', async function(req, res) {
    const data = await service.kesulitanBahanPokokList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kesulitanbahanpokok/detail', async function(req, res) {
    const data = await service.kesulitanBahanPokokDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kesulitanbahanpokok/tambah', async function(req, res) {
    const data = await service.kesulitanBahanPokokTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kesulitanbahanpokok/edit', async function(req, res) {
    const data = await service.kesulitanBahanPokokEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kesulitanbahanpokok/delete', async function(req, res) {
    const data = await service.kesulitanBahanPokokDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

//
//
//  JARAK PENGIRIMAN
//
//
app.get('/kriteria/jarakpengiriman/list', async function(req, res) {
    const data = await service.jarakPengirimanList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jarakpengiriman/detail', async function(req, res) {
    const data = await service.jarakPengirimanDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jarakpengiriman/tambah', async function(req, res) {
    const data = await service.jarakPengirimanTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jarakpengiriman/edit', async function(req, res) {
    const data = await service.jarakPengirimanEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/jarakpengiriman/delete', async function(req, res) {
    const data = await service.jarakPengirimanDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

//  DEADLINE HARI
app.get('/kriteria/deadlinehari/list', async function(req, res) {
    const data = await service.deadlineHariList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/deadlinehari/detail', async function(req, res) {
    const data = await service.deadlineHariDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/deadlinehari/tambah', async function(req, res) {
    const data = await service.deadlineHariTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/deadlinehari/edit', async function(req, res) {
    const data = await service.deadlineHariEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/deadlinehari/delete', async function(req, res) {
    const data = await service.deadlineHariDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

//
//
// ----- TENAGA KERJA
//
//
app.get('/kriteria/tenagakerja/list', async function(req, res) {
    const data = await service.tenagaKerjaList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/tenagakerja/detail', async function(req, res) {
    const data = await service.tenagaKerjaDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/tenagakerja/tambah', async function(req, res) {
    const data = await service.tenagaKerjaTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/tenagakerja/edit', async function(req, res) {
    const data = await service.tenagaKerjaEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/tenagakerja/delete', async function(req, res) {
    const data = await service.tenagaKerjaDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

//
//
//  KUANTITAS PESANAN
//
//
app.get('/kriteria/kuantitaspesanan/list', async function(req, res) {
    const data = await service.kuantitasPesananList();
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kuantitaspesanan/detail', async function(req, res) {
    const data = await service.kuantitasPesananDetail(req.body.Id);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kuantitaspesanan/tambah', async function(req, res) {
    const data = await service.kuantitasPesananTambah(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kuantitaspesanan/edit', async function(req, res) {
    const data = await service.kuantitasPesananEdit(req.body);
    res.status(data.status || 200).json(data);
})

app.post('/kriteria/kuantitaspesanan/delete', async function(req, res) {
    const data = await service.kuantitasPesananDelete(req.body.Id);
    res.status(data.status || 200).json(data);
})

module.exports = app;