<template>
    <div class="single-product">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-2">
                    <div class="card">
                        <img :src="product.image" class="card-img-top" alt="product-image">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.title }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                            <span class="text-danger"> {{ product.price }} </span>
                        </div>
                    </div>
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
            product: ''
        }
    },
    methods: {
        getProduct(id) {
            axios.get(`${this.apiUrl}/products/${id}`)
                .then(({data}) => {
                    this.product = data.data
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    },
    mounted() {
        window.axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.state.token}`;
        this.getProduct(this.$route.params.id)
    },
    computed: {
        apiUrl() {
        return this.$store.state.apiUrl;
        }
    },
}
</script>
<style scoped>

</style>