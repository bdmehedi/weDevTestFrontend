<template>
  <div class="login">
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-3">
                <form @submit.prevent="login">
                    <div class="card">
                        <div class="card-header">
                            <h3>Please login here</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input v-model="formData.email" type="email" name="email" id="email" class="form-control" placeholder="Enter your registered email">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input v-model="formData.password" type="password" name="password" id="password" class="form-control" placeholder="Enter your password">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-success">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            formData: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            axios.post(`${this.$store.state.apiUrl}/auth/login`, this.formData)
                .then((res) => {
                    this.$store.commit('updateToken', res.data.access_token)
                    this.$router.push('/home')
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    }
}
</script>

<style>

</style>
