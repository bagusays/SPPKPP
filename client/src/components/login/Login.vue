<template>
    <div class="center">
        <div class="card">
            <div class="card-body">
                <img src="../../assets/logo.png" width="200px" height="auto" style="display:block; margin: 0 auto"/><br>
                <form v-on:submit.prevent="onSubmit()">
                    <div class="form-group row">
                        <!-- <label class="col-md-2 col-form-label">Total Kuantitas<required-tag></required-tag></label> -->
                        <div class="input-group col-md-12">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-user"> </i></span>
                            </div>
                            <input type="text" v-model="form.Username" name="username" placeholder="Username" :class="errors.has('username') ? 'is-invalid' : ''" v-validate="'required'" class="form-control" required/>
                        </div>
                        <div class="col-md-12">
                            <p v-show="errors.has('username')" class="invalid-form">{{ errors.first('username') }}</p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <!-- <label class="col-md-2 col-form-label">Total Kuantitas<required-tag></required-tag></label> -->
                        <div class="input-group col-md-12">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-key"> </i></span>
                            </div>
                            <input type="text" v-model="form.Password" name="password" placeholder="Password" :class="errors.has('password') ? 'is-invalid' : ''" v-validate="'required'" class="form-control" required/>
                        </div>
                        <div class="col-md-12">
                            <p v-show="errors.has('password')" class="invalid-form">{{ errors.first('password') }}</p>
                        </div>
                    </div>
                    <div class="float-right">
                        <button type="submit" v-bind:disabled="errors.any()" class="btn button-action"> <i class="fa fa-fw fa-sign-in"> </i><span>Login</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import constant from '../../constants'

export default {
    props: ['error'],
    data() {
        return {
            form: {
                Username: '',
                Password: '',
            },
        }
    },
    created() {
        if(this.$route.query.error != null)
            console.log(this.error)
            this.$helpers.toast.show(this.$route.query.error, 'warning')
    },
    methods: {
        async onSubmit() {
            var validate = await this.$validator.validateAll();
            if(!validate) {
                alert('ga lolos')
                return false
            }
            
            const result = await axios.post(`${constant.baseUrl}/auth/requestToken`, this.form)
            console.log(result)
            if(result.data.status == 200) {
                localStorage.setItem('token', JSON.stringify(result.data.result))
                console.log(localStorage.getItem('token'))
                this.$router.push({ path: '/home' })
                return false;
                
            } else
                console.log(result)
                this.$helpers.alert.error(result.data.message)
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .center {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 30px 30px 30px;
    }

    .card {
        width: 400px;
    }
</style>
