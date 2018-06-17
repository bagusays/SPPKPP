<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">About</li>
            </ol>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">About</div>
                        <div class="card-body">
                            <h2 style="text-align: center; font-weight: bold">Tech Stack</h2>
                            <img src="../assets/tech.png" width="500px" height="auto" style="display:block; margin: 0 auto"/><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from './layout/Sidebar.vue'

export default {
    components: {
        'Sidebar': Sidebar
    },

    data() {
        return {
            data: []
        }
    }
}
</script>
