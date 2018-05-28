const app = require('express').Router();

app.get("/data-pemesan/parameter", function(req, res) {
    const parameter = {
        jenisKue: [
            { attribut: 'Nastar', bobot: 1 },
            { attribut: 'Kastengel', bobot: 2 },
            { attribut: 'Sagu Keju', bobot: 1 },
            { attribut: 'Chocochips', bobot: 2 }
        ],
        kebawelanPelanggan: [
            { attribut: "Asik", bobot: 0.1 },
            { attribut: "Sedang", bobot: 0.5 },
            { attribut: "Bawel", bobot: 1 }
        ],
        kesulitanBahanPokok: [
            { attribut: "Mudah", bobot: 0.1 },
            { attribut: "Sedang", bobot: 0.5 },
            { attribut: "Sulit", bobot: 1 }
        ],
        jarakPengiriman: [
            { attribut: "Dekat", bobot: 0.1 },
            { attribut: "Sedang", bobot: 0.5 },
            { attribut: "Jauh", bobot: 1 }
        ],
        tenagaKerja: [
            { attribut: "3", bobot: 0.1 },
            { attribut: "2", bobot: 0.5 },
            { attribut: "1", bobot: 1 }
        ],
    }
    res.status(200).json(parameter)
})

module.exports = app;