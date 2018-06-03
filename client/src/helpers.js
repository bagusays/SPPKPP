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
                    const data = await Vue.swal({
                        type: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: this.alertTimer
                    })

                    return data
                },

                async error(message) {
                    const data = await Vue.swal({
                        type: 'error',
                        title: message,
                        showConfirmButton: false,
                        timer: this.alertTimer
                    })

                    return data
                },

                async delete() {
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
                }
            }
            
        };
    }
};