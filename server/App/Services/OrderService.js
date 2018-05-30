const _ = require('lodash')

const Sequelize = require('../Model/Index')
const Orders = require('../Model/Orders')
const DataContent = require('../Model/DataContent')
const SubCriteria = require('../Model/SubCriteria')
const MasterCriteria = require('../Model/MasterCriteria')
const FuzzyJenisKue = require('../Model/FuzzyJenisKue')

const jsonParse = require('../Helper/json-parse')

class OrderService {

    constructor() { }

    async getAllOrders() {
        try {
            var fuzzyJenisKue = await FuzzyJenisKue.findAll()
            fuzzyJenisKue = fuzzyJenisKue.map(res => {
                res.CriteriaName = res.CriteriaName.replace('-', ' AND ')
                res.CriteriaValue = res.CriteriaValue
                return res
            })
            var paramFuzzy = ''
            fuzzyJenisKue = fuzzyJenisKue.forEach(res => {
                paramFuzzy += `
                WHEN SUM(IF(mc.CriteriaName = 'Jenis Kue', sc.CriteriaValue, NULL)) BETWEEN ${res.CriteriaName} THEN ${res.CriteriaValue}
                `
            })
            const query = `
            SELECT
                o.IdOrder,
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
                MAX(CASE WHEN t.IdMasterCriteria = 7 THEN t.SubCriteria ELSE NULL END) AS KuantitasPesanan,
                ROUND(t.HasilPerhitunganPrioritas, 4) AS HasilPerhitunganPrioritas
            FROM
                (SELECT
                    t.*,
                    SUM(t.Fuzzy) over(partition by t.CustomerName) AS HasilPerhitunganPrioritas
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
                                o.IdOrder,
                                c.IdCustomer,
                                c.CustomerName,
                                mc.IdMasterCriteria,
                                mc.CriteriaValue AS MasterCriteriaValue,
                                mc.CriteriaName AS MasterCriteria,
                                sc.CriteriaName AS SubCriteria,
                                sc.CriteriaValue
                            FROM pp_datacontent dc
                            INNER JOIN pp_subcriteria sc ON sc.IdSubCriteria = dc.IdSubCriteria
                            INNER JOIN pp_mastercriteria mc ON mc.IdMasterCriteria = dc.IdMasterCriteria
                            INNER JOIN pp_orders o ON o.IdOrder = dc.IdOrder
                            INNER JOIN pp_customers c ON c.IdCustomer = o.IdCustomer
                            WHERE mc.IdMasterCriteria <> 1
                            UNION ALL
                            SELECT
                                o.IdOrder,
                                c.IdCustomer,
                                c.CustomerName,
                                mc.IdMasterCriteria,
                                mc.CriteriaValue AS MasterCriteriaValue,
                                mc.CriteriaName AS MasterCriteria,
                                CASE WHEN mc.IdMasterCriteria = 1 THEN
                                    GROUP_CONCAT(IF(mc.CriteriaName = 'Jenis Kue', sc.CriteriaName, NULL) SEPARATOR ', ') 
                                END AS SubCriteria,
                                CASE WHEN mc.CriteriaName = 'Jenis Kue' THEN 
                                    CASE 
                                        ${paramFuzzy}
                                    END
                                END AS CriteriaValue
                            FROM pp_datacontent dc
                            INNER JOIN pp_subcriteria sc ON sc.IdSubCriteria = dc.IdSubCriteria
                            INNER JOIN pp_mastercriteria mc ON mc.IdMasterCriteria = dc.IdMasterCriteria
                            INNER JOIN pp_orders o ON o.IdOrder = dc.IdOrder
                            INNER JOIN pp_customers c ON c.IdCustomer = o.IdCustomer
                            WHERE mc.IdMasterCriteria = 1
                            GROUP BY mc.CriteriaName, o.IdOrder
                            UNION ALL
                            SELECT
                                t.IdOrder,
                                t.IdCustomer,
                                t.CustomerName,
                                mc.IdMasterCriteria,
                                mc.CriteriaValue AS MasterCriteriaValue,
                                mc.CriteriaName AS MasterCriteria,
                                dc.CriteriaName AS SubCriteria,
                                dc.CriteriaValue AS CriteriaValue
                            FROM
                                (SELECT
                                    o.IdOrder,
                                    c.IdCustomer,
                                    c.CustomerName,
                                    DATEDIFF(o.DeadlineDate, NOW()) AS IntervalDate
                                FROM pp_orders o
                                INNER JOIN pp_customers c ON c.IdCustomer = o.IdCustomer
                                ) t
                            INNER JOIN pp_deadlinecriteria dc ON dc.IdDeadlineCriteria = t.IntervalDate
                            INNER JOIN pp_mastercriteria mc ON mc.IdMasterCriteria = dc.IdMasterCriteria
                            ) t
                        ORDER BY t.CustomerName, t.IdMasterCriteria
                        ) t
                    ) t
                ) t
            INNER JOIN pp_orders o ON o.IdCustomer = t.IdCustomer
            GROUP BY t.customername
            ORDER BY t.HasilPerhitunganPrioritas desc
            `
            const data = await Sequelize.query(query, {type: Sequelize.QueryTypes.SELECT})
            return jsonParse(data)
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }

    async getParameter() {
        try {
            const query = (criteria) => {
                let data = SubCriteria.findAll({
                    where: {
                        IdMasterCriteria: criteria
                    }
                })
                return data
            }

            const data = {
                jenisKue: await query(1),
                kebawelanPelanggan: await query(2),
                kesulitanBahanPokok: await query(3),
                jarakPengiriman: await query(4),
                tenagaKerja: await query(6)
            }
            return jsonParse(data)
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }
}

module.exports = OrderService