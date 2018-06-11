<template>
<div id="app">
    <vue-progress-bar></vue-progress-bar>
    <router-view/>
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            urlPath: this.$route.path
        }
    },
    mounted() {
        //  [App.vue specific] When App.vue is finish loading finish the progress bar
        this.$Progress.finish()
    },
    created() {
        this.loadingBar()
        this.auth()
    },
    methods: {
        loadingBar() {
            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start()
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress
                    // parse meta tags
                    this.$Progress.parseMeta(meta)
                }
                //  start the progress bar
                this.$Progress.start()
                //  continue to next page
                next()
            })
            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach((to, from) => {
                //  finish the progress bar
                this.$Progress.finish()
            })
        },
        auth() {
            
        }
    },
}

</script>

<style lang="scss">
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';

@import './assets/css/sb-admin.css';
@import 'vue-multiselect/dist/vue-multiselect.min.css';
@import './assets/css/styles.css';

</style>
