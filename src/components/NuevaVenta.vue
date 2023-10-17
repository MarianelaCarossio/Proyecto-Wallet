<template>
    <div>
      <form @submit.prevent="nuevaVenta">
        <label for="cryptoTipo">Criptomoneda:</label>
        <select id="cryptoTipo" v-model="cryptoCode">
          <option value="btc">Bitcoin</option>
          <option value="usdc">USDC</option>
          <option value="eth">Ethereum</option>
        </select>
        <label for="cryptoCantidad">Cantidad:</label>
        <input type="number" id="cryptoCantidad" name="cryptoCantidad" v-model="cryptoAmount" step="0.0001" required>
        <label for="dinero">Dinero (ARS):</label>
        <input type="number" id="dinero" name="dinero" v-model="money" step="0.01" required>
        <label for="fecha-hora">Fecha y Hora:</label>
        <input type="datetime-local" id="fecha-hora" name="fecha-hora" v-model="datetime" required>
        <button type="submit">Guardar Venta</button>
      </form>
    </div>
  </template>
  
  <script>
 import apiClient from '@/services/apiClient';
 
  export default {
    data() {
      return {
        cryptoCode: 'btc',
        cryptoAmount: '',
        money: '',
        datetime: '',
      };
    },
    methods: {
      async nuevaVenta() {
        if (this.cryptoAmount <= 0 || this.money <= 0) {
          alert('La cantidad de criptomonedas y el monto deben ser mayores a 0.');
          return;
        }
  
        const datosVenta = {
          user_id: this.$store.state.userId,
          action: 'sale',
          crypto_code: this.cryptoCode,
          crypto_amount: this.cryptoAmount,
          money: this.money,
          datetime: this.datetime,
        };
  
        try {
          const response = await apiClient.post('/transactions', datosVenta);
          console.log('Venta guardada:', response.data);
        } catch (error) {
          console.error('Error al guardar la venta:', error);
        }     
      },
    }
  };
  </script>
  
  <style scoped>
  div {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  label {  
    font-weight: bold;
  }

  input[type="number"],
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
   
  }

  button[type="submit"] {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }

  input[type="datetime-local"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  </style>
  