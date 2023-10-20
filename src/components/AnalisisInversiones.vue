<template>
    <div>
      <h1>Resultados de Inversiones</h1>
      <table class="tabla-inversiones">
          <tr>
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
          <tr v-for="(resultado, crypto) in resultados" :key="crypto">
            <td>{{ crypto }}</td>
            <td>{{ formatCurrency(resultado) }}</td>
          </tr>
      </table>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/apiClient';
  import cryptoApiClient from '@/services/cryptoApiClient';
  
  export default {
    data() {
      return {
        resultados: {},
      };
    },
    created() {
      this.calcularResultados();
    },
    methods: {
      async calcularResultados() {
        const response = await apiClient.get(`/transactions?q={"user_id": "${this.$store.state.userId}"}`);
        const transacciones = response.data;
        const resultados = {};
  
        for (const transaccion of transacciones) {
          const cryptoTipo = transaccion.crypto_code;
          const cryptoCantidad = parseFloat(transaccion.crypto_amount);
          const dineroGastado = parseFloat(transaccion.money);    
          const cryptoPrecio = await cryptoApiClient.getDetails(cryptoTipo);
         
          const resultado = transaccion.action === 'purchase'
            ? (cryptoPrecio.ask * cryptoCantidad) - dineroGastado
            : dineroGastado - (cryptoPrecio.ask * cryptoCantidad);
  
          if (!resultados[cryptoTipo]) {
            resultados[cryptoTipo] = 0;
          }
          resultados[cryptoTipo] += resultado;
        }
  
        this.resultados = resultados;
      },
      formatCurrency(value) {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
      },
    },
  };
  </script>

<style scoped>
.tabla-inversiones {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.tabla-inversiones th, 
.tabla-inversiones td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.tabla-inversiones th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.tabla-inversiones tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>

  