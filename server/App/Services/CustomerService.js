const Customers = require('../Model/Customers')
const jsonParse = require('../Helper/json-parse')

class CustomerService {
    constructor() { }

    async getAllCustomer() {
        try {
            const data = await Customers.findAll();
            return jsonParse(data)
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }

    async detailCustomer(IdCustomer) {
        try {
            const data = await Customers.findOne({
                where: {
                    IdCustomer
                }
            })
            return { result: data }
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }

    async editCustomer(param) {
        try {
            const { IdCustomer, CustomerName, PhoneNumber, Address } = param
            const data = await Customers.update({
                CustomerName,
                PhoneNumber,
                Address
            }, {
                where: {
                    ICustomer
                }
            })
            return jsonParse("ok")
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }
}

module.exports = CustomerService;