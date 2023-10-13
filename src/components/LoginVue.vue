<template>
  <div class="login">
    <h1>Registrarse</h1>
    <form @submit.prevent="iniciarSesion">
      <input type="text" v-model="idUsuario" required>
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginVue",
  data() {
    return {
      idUsuario: "",
    };
  },
  methods: {
    iniciarSesion() { 
      this.$store.commit('setUserId', this.idUsuario);
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.login {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
}

.login:hover {
  transform: scale(1.03);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 10px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>