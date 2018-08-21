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
                            <img src="../assets/logo.png" width="400px" height="auto" style="display:block; margin: 0 auto"/><br>
                            <p style="text-align: center">Berdiri sejak 2005</p>
                            <h2 style="text-align: center; font-weight: bold">Visi</h2>
                            <p style="text-align: center">
                                Menjadikan kue kering sebagai sajian makanan yg berkreasi <br>
                                Mampu bersaing dipasaran <br>
                                Mempertahankan kwantitas dan kualitas makanan <br>
                            </p>
                            <h2 style="text-align: center; font-weight: bold">Misi</h2>
                            <p style="text-align: center">
                                Meningkatkan promosi melalui media online maupun media promosi lain <br>
                                Menjaga kualitas dan kuantitas sesuai dengan permintaan konsumen <br>
                                Melakukan inovasi berkelanjutan untuk menghasilkan kue kering seiring dengan perkembangan zaman <br>
                            </p>
                            <p style="text-align:center">
								<strong>Santhi's Cook and Catering</strong><br>
								<strong>Telephone</strong> +6285311474050<br>
								<strong>Address</strong> Jl. Dewata Bukit Duri, Tebet, Jakarta Selatan, Indonesia <br>
								<strong>Owner</strong> Ida Nursanthi
							</p>
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
