'use strict';

const _ = require('lodash')
const db = require('../../db')
const jsonParse = require('../Helper/json-parse')

class OrderService {
    
    constructor() { 
        this.QUERY_GET_ALL_ORDERS = `
                SELECT
            t.IdOrder,
            t.IdCustomer,
            t.CustomerName,
            CASE WHEN t.IdMasterCriteria = 1 THEN
                GROUP_CONCAT(IF(t.IdMasterCriteria = 1, t.SubCriteria, NULL) SEPARATOR ', ') 
            END AS JenisKue,
            MAX(CASE WHEN t.IdMasterCriteria = 2 THEN t.SubCriteria ELSE NULL END) AS KebawelanPelanggan,
            MAX(CASE WHEN t.IdMasterCriteria = 3 THEN t.SubCriteria ELSE NULL END) AS KesulitanBahanPokok,
            MAX(CASE WHEN t.IdMasterCriteria = 4 THEN t.SubCriteria ELSE NULL END) AS JarakPengiriman,
            o.DeadlineDate as DeadlineDate,
            MAX(CASE WHEN t.IdMasterCriteria = 5 THEN t.SubCriteria ELSE NULL END) AS IntervalDeadlineHari,
            MAX(CASE WHEN t.IdMasterCriteria = 6 THEN t.SubCriteria ELSE NULL END) AS TenagaKerja,
            o.TotalQuantity,
            t.HasilPerhitunganPrioritas
        FROM
            (SELECT
                t.*,
                SUM(t.Fuzzy) over(partition by t.idorder) AS HasilPerhitunganPrioritas
            FROM
                (SELECT
                    t.*,
                    ROUND(t.MasterCriteriaValue * t.HasilNormalisasi, 4) AS Fuzzy
                FROM
                    (SELECT
                        t.*,
                        ROUND(t.CriteriaValue/MAX(t.CriteriaValue) over(PARTITION BY t.IdMasterCriteria), 4) AS HasilNormalisasi
                    FROM
                        (SELECT
                            o.Id as IdOrder,
                            c.Id as IdCustomer,
                            c.CustomerName,
                            mc.Id as IdMasterCriteria,
                            mc.CriteriaValue AS MasterCriteriaValue,
                            mc.CriteriaName AS MasterCriteria,
                            sc.CriteriaName AS SubCriteria,
                            sc.CriteriaValue
                        FROM pp_datacontent dc
                        INNER JOIN pp_subcriteria sc ON sc.Id = dc.IdSubCriteria
                        INNER JOIN pp_mastercriteria mc ON mc.Id = dc.IdMasterCriteria
                        INNER JOIN pp_orders o ON o.Id = dc.IdOrder
                        INNER JOIN pp_customers c ON c.Id = o.IdCustomer
                        WHERE mc.Id <> 1
                        UNION ALL
                        SELECT
                            t.IdOrder,
                            t.IdCustomer,
                            t.CustomerName,
                            t.IdMasterCriteria,
                            t.MasterCriteriaValue,
                            t.MasterCriteria,
                            t.SubCriteria,
                            fz.CriteriaValue
                        FROM
                            (SELECT
                                o.Id as IdOrder,
                                c.Id as IdCustomer,
                                c.CustomerName,
                                mc.Id as IdMasterCriteria,
                                mc.CriteriaValue AS MasterCriteriaValue,
                                mc.CriteriaName AS MasterCriteria,
                                CASE WHEN mc.Id = 1 THEN
                                    GROUP_CONCAT(IF(mc.CriteriaName = 'Jenis Kue', sc.CriteriaName, NULL) SEPARATOR ', ') 
                                END AS SubCriteria,
                                ROUND(SUM(IF(mc.CriteriaName = 'Jenis Kue', sc.CriteriaValue, NULL)), 0) AS TotalBobotJenisKue
                            FROM pp_datacontent dc
                            INNER JOIN pp_subcriteria sc ON sc.Id = dc.IdSubCriteria
                            INNER JOIN pp_mastercriteria mc ON mc.Id = dc.IdMasterCriteria
                            INNER JOIN pp_orders o ON o.Id = dc.IdOrder
                            INNER JOIN pp_customers c ON c.Id = o.IdCustomer
                            WHERE mc.Id = 1
                            GROUP BY mc.CriteriaName, o.Id
                            ) t
                        INNER JOIN pp_fuzzyjeniskuecriteria fz ON fz.Id = t.TotalBobotJenisKue
                        UNION ALL
                        SELECT
                            t.IdOrder,
                            t.IdCustomer,
                            t.CustomerName,
                            mc.Id,
                            mc.CriteriaValue AS MasterCriteriaValue,
                            mc.CriteriaName AS MasterCriteria,
                            dc.CriteriaName AS SubCriteria,
                            dc.CriteriaValue AS CriteriaValue
                        FROM
                            (SELECT
                                o.Id as IdOrder,
                                c.Id as IdCustomer,
                                c.CustomerName,
                                DATEDIFF(o.DeadlineDate, NOW()) AS IntervalDate
                            FROM pp_orders o
                            INNER JOIN pp_customers c ON c.Id = o.IdCustomer
                            ) t
                        INNER JOIN pp_deadlinecriteria dc ON dc.Id = t.IntervalDate
                        INNER JOIN pp_mastercriteria mc ON mc.Id = dc.IdMasterCriteria
                        ) t
                    ORDER BY t.IdOrder, t.IdMasterCriteria
                    ) t
                ) t
            ) t
        INNER JOIN pp_customers c ON c.Id = t.IdCustomer
        INNER JOIN pp_orders o ON o.Id = t.idorder
        GROUP BY t.idorder
        ORDER BY t.HasilPerhitunganPrioritas desc
        `

    }

    async getAllOrders() {
        try {
            const data = await db.raw(this.QUERY_GET_ALL_ORDERS)
            return jsonParse({result: data[0]})
        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async getParameter() {
        try {
            const query = (criteria) => {
                let data = db('pp_subcriteria').where({
                    IdMasterCriteria: criteria
                })
                return data
            }

            const data = {
                nama: await db.select().from('pp_customers'),
                jenisKue: await query(1),
                kebawelanPelanggan: await query(2),
                kesulitanBahanPokok: await query(3),
                jarakPengiriman: await query(4),
                tenagaKerja: await query(6)
            }
            return jsonParse({result: data})
        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async getDetail(IdOrder) {
        try {
            const data = {}

            data.nama = await db.from('pp_orders')
                .innerJoin('pp_customers', 'pp_orders.IdCustomer', 'pp_customers.Id')
                .where('pp_orders.Id', IdOrder).first()

            data.jenisKue = await db.from('pp_datacontent')
                .innerJoin('pp_subcriteria', 'pp_datacontent.IdSubCriteria', 'pp_subcriteria.Id')
                .where({ 
                    'pp_datacontent.IdOrder': IdOrder,
                    'pp_subcriteria.IdMasterCriteria': 1
                })
                
            const dataContent = await db.from('pp_datacontent')
                .innerJoin('pp_subcriteria', 'pp_datacontent.IdSubCriteria', 'pp_subcriteria.Id')
                .whereNot('pp_subcriteria.IdMasterCriteria', 1)
                .where('pp_datacontent.IdOrder', IdOrder)

            dataContent.map(res => {
                let p = res.IdMasterCriteria;
                if(p == 2)
                    data.kebawelanPelanggan = res
                else if (p == 3)
                    data.kesulitanBahanPokok = res
                else if (p == 4)
                    data.jarakPengiriman = res
                else if (p == 6)
                    data.tenagaKerja = res
            })

            return jsonParse({result: data})

        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async addOrder(param) {
        try {
            const { Nama, JenisKue, KebawelanPelanggan, KesulitanBahanPokok, JarakPengiriman, DeadlineDate, TenagaKerja, TotalQuantity } = param
            const addOrder = await db('pp_orders')
                .returning('IdOrder')
                .insert({
                    IdCustomer: Nama.Id,
                    TotalQuantity,
                    DeadlineDate
                })

            const query = async (IdMasterCriteria, IdSubCriteria) => {
                const data = await db('pp_datacontent').insert({
                    IdOrder: addOrder[0],
                    IdMasterCriteria,
                    IdSubCriteria
                })

                return data
            }

            var qty = await this.checkQuantity(TotalQuantity)

            for(let data of JenisKue) {
                await query(1, data.Id)
            }

            await query(2, KebawelanPelanggan)
            await query(3, KesulitanBahanPokok)
            await query(4, JarakPengiriman)
            await query(6, TenagaKerja)
            await query(7, qty)

            return jsonParse({message: "Data order berhasil di tambah."})
        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async deleteOrder(IdOrder) {
        try {
            const queryDataContent = await db('pp_datacontent').where({IdOrder}).del()
            const queryOrders = await db('pp_orders').where({Id: IdOrder}).del()

            return jsonParse({message: "Data order berhasil di hapus."})
        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async updateOrder(param) {
        try {
            const { IdOrder, Nama, JenisKue, TotalQuantity, DeadlineDate, KebawelanPelanggan, KesulitanBahanPokok, JarakPengiriman, TenagaKerja } = param
            const order = await db('pp_orders').where({Id: IdOrder}).update({
                IdCustomer: Nama.Id,
                TotalQuantity: TotalQuantity,
                DeadlineDate: DeadlineDate
            })

            const updateContent = (IdMasterCriteria, IdSubCriteria) => {
                const data = db('pp_datacontent').where({
                    IdOrder,
                    IdMasterCriteria,
                }).update({
                    IdSubCriteria
                })
                return data
            }
            
            var qty = await this.checkQuantity(TotalQuantity)

            await this.updateJenisKue(IdOrder, JenisKue)
            await updateContent(2, KebawelanPelanggan)
            await updateContent(3, KesulitanBahanPokok)
            await updateContent(4, JarakPengiriman)
            await updateContent(6, TenagaKerja)
            await updateContent(7, qty)

            return jsonParse({message: "Data order berhasil di ubah."})
        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async updateJenisKue(IdOrder, JenisKue) {
        const jenisKue = await db('pp_datacontent').where({IdOrder, IdMasterCriteria: 1})

        for(let dataParam of JenisKue) {
            let dataDb = jenisKue.map(res => res.IdSubCriteria)
            let check = dataDb.includes(dataParam.IdSubCriteria)
            if(!check) {
                console.log(dataParam.Id + ' baru nih')
                let x = await db('pp_datacontent').insert({
                    IdMasterCriteria: 1,
                    IdSubCriteria: dataParam.Id,
                    IdOrder
                })
            }
        }

        for(let dataDb of jenisKue) {
            let dataParam = JenisKue.map(res => res.IdSubCriteria)
            let check = dataParam.includes(dataDb.IdSubCriteria)
            if(!check) {
                console.log(dataDb + ' perlu dihapus nih')
                let x = await db('pp_datacontent').where({
                    IdMasterCriteria: 1,
                    IdSubCriteria: dataDb.IdSubCriteria,
                    IdOrder
                }).del()
            }
        }
    }

    async checkQuantity(TotalQuantity) {
        var result = null;
        const data = await db('pp_subcriteria').where({IdMasterCriteria: 7})

        data.find(res => {
            let data = res.CriteriaName.split('-')
            const range = _.inRange(TotalQuantity, data[0], data[1])
            if(range == true)
                result = res.Id
        })

        if(result == null)
            result = data[0].IdSubCriteria

        return result
    }
}

module.exports = OrderService
