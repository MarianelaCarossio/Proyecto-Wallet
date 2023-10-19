<template>
  <div>
    <h2>Analisis del estado actual</h2>
    <table class="tabla-estado">     
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Dinero</th>
        </tr>    
        <tr v-for="(crypto, key) in datosCrypto" :key="key">
          <td>{{ key }}</td>
          <td>{{ crypto.amount }}</td>
          <td>{{ formatCurrency(crypto.money) }}</td>
        </tr>
        <tr>
          <td><strong>Total</strong></td>
          <td></td>
          <td class="celda-total">{{ formatCurrency(totalDinero) }}</td>
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
      datosCrypto: {},
      totalDinero: 0,
    };
  },
  created() {
    this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      try {
        const response = await apiClient.get(`/transactions?q={"user_id": "${this.$store.state.userId}"}`);
        const transacciones = response.data;
        const cryptoCantidad = {};
        transacciones.forEach((transaccion) => {
          const cryptoTipo = transaccion.crypto_code;
          if (!cryptoCantidad[cryptoTipo]) {
            cryptoCantidad[cryptoTipo] = 0;
          }
          if (transaccion.action === 'purchase') {
            cryptoCantidad[cryptoTipo] += parseFloat(transaccion.crypto_amount);
          } else if (transaccion.action === 'sale') {
            cryptoCantidad[cryptoTipo] -= parseFloat(transaccion.crypto_amount);
          }
        });

    
        const bitcoinPrice = await cryptoApiClient.getDetails('btc');
        const ethereumPrice = await cryptoApiClient.getDetails('eth');
        const usdcPrice = await cryptoApiClient.getDetails('usdc');

       
        const cryptoValues = {};
        for (const cryptoTipo in cryptoCantidad) {
          const cantidad = cryptoCantidad[cryptoTipo];
          let price = 0;

          if (cryptoTipo === 'btc') {
            price = bitcoinPrice.ask;
          } else if (cryptoTipo === 'eth') {
            price = ethereumPrice.ask;
          } else if (cryptoTipo === 'usdc') {
            price = usdcPrice.ask;
          }

          cryptoValues[cryptoTipo] = {
            cantidad,
            money: cantidad * price,
          };
        }

        let totalDinero= 0;
        for (const cryptoTipo in cryptoValues) {
          totalDinero += cryptoValues[cryptoTipo].money;
        }

        this.datosCrypto = cryptoValues;
        this.totalDinero = totalDinero;
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
    },
  },
};
</script>

<style scoped>
.tabla-estado {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.tabla-estado th, 
.tabla-estado td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.tabla-estado th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.tabla-estado tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.celda-total {
  font-weight: bold;
}
</style>
