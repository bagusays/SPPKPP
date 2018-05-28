export default {
    install: (Vue) => {
        Vue.prototype.$basevar = {
            baseUrl: 'http://localhost:3000'
        }
    }
};