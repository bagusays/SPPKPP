export default {
    install: (Vue) => {
        Vue.prototype.$helpers = {
            
            //---- TOAST
            toast: {
                show(keyword, icon) {
                    Vue.toasted.show(keyword, { icon : icon }).goAway(5000)
                }
            }
            
        };
    }
};