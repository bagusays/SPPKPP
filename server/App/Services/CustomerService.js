const Customers = require('../Model/Customers')

class CustomerService {
    constructor() { }

    async getAllCustomer() {
        try {
            const data = await Customers.findAll();
            return { result: data }
        } catch (error) {
            return { status: 500, result: error.message }
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
                    IdCustomer
                }
            })
            return { result: "ok" }
        } catch (error) {
            return { status: 500, result: error.message }
        }
    }
}

module.exports = CustomerService;