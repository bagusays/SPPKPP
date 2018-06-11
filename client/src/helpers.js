import axios from 'axios'
import constant from './constants'

export default {
    install: (Vue) => {
        Vue.prototype.$helpers = {
            
            //---- TOAST
            toast: {
                show(keyword, icon) {
                    Vue.toasted.show(keyword, { icon : icon }).goAway(5000)
                }
            },
            alert: {
                alertTimer: 3000,

                async success(message) {
                    try {
                        const data = await Vue.swal({
                            type: 'success',
                            title: message,
                            showConfirmButton: false,
                            timer: this.alertTimer
                        })
    
                        return data
                    } catch (error) {
                        console.log(error)
                    }
                },

                async error(message) {
                    try {
                        const data = await Vue.swal({
                            type: 'error',
                            title: message,
                            showConfirmButton: false,
                            timer: this.alertTimer
                        })
    
                        return data
                    } catch (error) {
                        console.log(error)
                    }
                },

                async delete() {
                    try {
                        const data = await Vue.swal({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#414C58',
                            confirmButtonText: 'Yes, delete it!'
                        })
                        return data
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            axiosAuth: {
                async get(url) {
                    const token = JSON.parse(localStorage.getItem('token')).token
                    const config = {
                        headers: {'Authorization': "bearer " + token}
                    };
                    const data = await axios.get(`${constant.baseUrl}${url}`, config)
                    return data
                },

                async post(url, param) {
                    const token = JSON.parse(localStorage.getItem('token')).token
                    const config = {
                        headers: {'Authorization': "bearer " + token}
                    };
                    const data = await axios.post(`${constant.baseUrl}${url}`, param, config)
                    return data
                }
            }
        };
    }
};