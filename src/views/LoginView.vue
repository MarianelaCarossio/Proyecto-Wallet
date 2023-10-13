<template>
  <h1>MI CARTERA CRYPTO</h1>
  <div class="login-view"> 
    <LoginVue />  
  </div>
</template>

<script>
import LoginVue from '@/components/LoginVue.vue';

export default {
  name: 'LoginView',
  components: {
    LoginVue,  
  },
}; 
</script>

<style scoped>
.login-view{
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
