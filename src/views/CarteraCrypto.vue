<template>
  <div>
    <h1>Bienvenid@, {{ userId }}!!!</h1>
  <div >
    <router-link class="style-link" to="/NuevaCompra">COMPRAR CRYPTO</router-link>
  </div>
  </div>
</template>

<script>
 export default {
    name: 'CarteraCrypto',
    computed: {
        userId() {
            return this.$store.state.userId;
        },
    },
}
</script>

<style scoped>
h1 {
  color: #d679a0;
}
.style-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin: 0 auto;
  margin-bottom: 20px;
  font-weight: bold;
}
.style-link:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
