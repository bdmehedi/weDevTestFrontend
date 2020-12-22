<template>
  <div id="app">
    <div id="nav" class="text-center">
      <router-link to="/">Home</router-link> 
      <span v-if="! isLogin"> | </span>
      <router-link v-if="! isLogin" to="/login">Login</router-link>
      <span v-if="isLogin"> | </span>
      <a v-if="isLogin" @click="logout" class="text-primary custom-link">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    logout() {
      window.axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.state.token}`
      axios.post(`${this.apiUrl}/auth/logout`)
          .then((res) => {
            if(res.status == 200) {
              this.$store.commit('logout')
              this.$router.push('/login')
              // window.location.reload();
            } else {
              window.location.reload();
            }
          })
          .catch((err) => {
            if(err.response.status == 401) {
              this.$store.commit('logout')
              this.$router.push('/login')
            } else {
              console.log(err.response)
            }
          })
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogIn
    },
    apiUrl() {
      return this.$store.state.apiUrl
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.custom-link {
  cursor: pointer;
}
</style>
