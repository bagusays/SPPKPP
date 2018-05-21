<template>
<div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Sidebar></Sidebar>
    <!-- <img src="./assets/logo.png"> -->
    <div class="content-wrapper">
        <div class="container-fluid">
            <router-view/>

            <footer class="sticky-footer">
                <div class="container">
                    <div class="text-center">
                        <small>Copyright © Bagus 2018</small>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</div>
</template>

<script>

import Sidebar from './components/layout/Sidebar.vue'

export default {
    name: 'App',
    components: {
        'Sidebar': Sidebar
    },
    mounted() {
        //  [App.vue specific] When App.vue is finish loading finish the progress bar
        this.$Progress.finish()
    },
    created() {
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
    }
}

</script>

<style lang="scss">
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';

@import './assets/css/sb-admin.css';
@import 'vue-multiselect/dist/vue-multiselect.min.css';
@import './assets/css/styles.css';

</style>
