<template>
  <div class="home">
    <div class="container">
      <div v-if="! isEdit" class="card">
        <div class="card-header">
          <h3>Products Create</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="submit" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input id="title" v-model="title" type="text" :class="[errors.title ? 'is-invalid' : '']" @focus="delete errors.title" name="title" class="form-control" placeholder="product title">
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(title_err, index) in errors.title" :key="index">{{ title_err }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="price">Price</label>
                    <input id="price" type="number" :class="[errors.price ? 'is-invalid' : '']" @focus="delete errors.price" v-model="price" min="0" name="price" class="form-control" placeholder="product price">
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(price_err, index) in errors.price" :key="index">{{ price_err }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" type="text" :class="[errors.description ? 'is-invalid' : '']" @focus="delete errors.description" v-model="description" name="description" class="form-control" placeholder="product description"></textarea>
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(description_err, index) in errors.description" :key="index">{{ description_err }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="image">Product Image</label>
                    <input id="image" @change="selectedImage" :class="[errors.image ? 'is-invalid' : '']" @focus="delete errors.image" type="file" name="image" class="form-control" placeholder="product image" accept="image/*">
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(image_err, index) in errors.image" :key="index">{{ image_err }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </form>
        </div>
      </div>
      <div v-if="isEdit" class="card">
        <div class="card-header">
          <h3 class="float-left">Products Edit</h3>
          <button @click="newProduct" class="btn btn-link float-right">New Product</button>
        </div>
        <div class="card-body">
            <form @submit.prevent="update" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input id="title" v-model="toUpdateData.title" type="text" :class="[errors.title ? 'is-invalid' : '']" @focus="delete errors.title" name="title" class="form-control" placeholder="product title">
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(title_err, index) in errors.title" :key="index">{{ title_err }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="price">Price</label>
                    <input id="price" type="number" :class="[errors.price ? 'is-invalid' : '']" @focus="delete errors.price" v-model="toUpdateData.price" min="0" name="price" class="form-control" placeholder="product price">
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(price_err, index) in errors.price" :key="index">{{ price_err }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" type="text" :class="[errors.description ? 'is-invalid' : '']" @focus="delete errors.description" v-model="toUpdateData.description" name="description" class="form-control" placeholder="product description"></textarea>
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(description_err, index) in errors.description" :key="index">{{ description_err }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="image">Product Image</label>
                    <input id="image" @change="selectedImageToEdit" :class="[errors.image ? 'is-invalid' : '']" @focus="delete errors.image" type="file" name="image" class="form-control" placeholder="product image" accept="image/*">
                    <span class="invalid-feedback" role="alert">
                      <strong v-for="(image_err, index) in errors.image" :key="index">{{ image_err }}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary">Update</button>
                  </div>
                </div>
              </div>
            </form>
        </div>
      </div>
      <hr>
      <div v-if="Object.keys(products).length" class="card">
        <div class="card-header">
          <h3>Product List</h3>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
              <tr v-for="(product, index) in products" :key="index">
                <td>{{ product.id }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <img height="9%" :src="product.image" alt="sdf">
                </td>
                <td>
                  <button @click="show(product.id)" class="btn btn-link">View</button>
                  <button @click="edit(product.id)" class="btn btn-link">Edit</button>
                  <button @click="deleteProduct(product.id)" class="btn btn-link">Delete</button>
                </td>
              </tr>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      title: '',
      description: '',
      price: '',
      image: '',
      errors: [],
      products: '',
      isEdit: false,
      toUpdateData: {
        title: '',
        description: '',
        price: '',
        image: '',
      },
      productId: '',
    }
  },
  methods: {
    submit(e) {
      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      };
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('price', this.price);
      
      axios.post(`${this.apiUrl}/products`, formData, config)
        .then((res) => {
          e.target.reset();
          this.title = '';
          this.description = '';
          this.price = '';
          console.log(res)
          this.getProducts();
        })
        .catch((err) => {
          if(err.response.status == 422) {
            this.errors = err.response.data.errors
          }
        })
    },
    getProducts() {
      axios.get(`${this.apiUrl}/products`)
        .then((res) => {
          this.products = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    selectedImage(e) {
      this.image = e.target.files[0];
      delete this.errors.image;
    },
    selectedImageToEdit(e) {
      this.toUpdateData.image = e.target.files[0];
      delete this.errors.image;
    },
    deleteProduct(id) {
      if(confirm('Are you sure ?')) {
        axios.delete(`${this.apiUrl}/products/${id}`)
          .then((res) => {
            this.getProducts();
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    show(id) {
      this.$router.push(`/product/${id}`)
    },
    edit(id) {
      axios.get(`${this.apiUrl}/products/${id}`)
          .then(({data}) => {
            let info = data.data
            this.toUpdateData.title = info.title
            this.toUpdateData.description = info.description
            this.toUpdateData.price = info.price
            this.productId = id
            this.isEdit = true
          })
          .catch((err) => {
              console.log(err.response)
          })
    },
    update(e) {
      const config = {
          headers: { 'content-type': 'multipart/form-data'}
      };
      let formData = new FormData();
      formData.append('image', this.toUpdateData.image);
      formData.append('title', this.toUpdateData.title);
      formData.append('description', this.toUpdateData.description);
      formData.append('price', this.toUpdateData.price);
      formData.append('_method', 'PATCH');
      
      axios.post(`${this.apiUrl}/products/${this.productId}`, formData, config)
        .then((res) => {
          this.toUpdateData.title = '';
          this.toUpdateData.description = '';
          this.toUpdateData.price = '';
          e.target.reset();
          console.log(res)
          this.getProducts();
        })
        .catch((err) => {
          if(err.response.status == 422) {
            this.errors = err.response.data.errors
          }
        })
    },
    newProduct() {
      this.isEdit = false
    }
  },
  computed: {
    apiUrl() {
      return this.$store.state.apiUrl;
    }
  },
  mounted() {
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.state.token}`;
    this.getProducts();
  }
}
</script>
